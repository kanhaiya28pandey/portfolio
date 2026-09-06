import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportModal } from '../components/common/SupportModal';
import { fetchPortfolioOverview } from '../services/api';

interface SupportModalContextType {
  isSupportOpen: boolean;
  openSupport: () => void;
  closeSupport: () => void;
}

const SupportModalContext = createContext<SupportModalContextType | undefined>(undefined);

export const SupportModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportData, setSupportData] = useState<{ coffeeUrl?: string; fullName?: string }>({
    coffeeUrl: 'pandey123@okhdfcbank',
    fullName: 'Kanhaiya Pandey',
  });

  useEffect(() => {
    let isMounted = true;
    fetchPortfolioOverview()
      .then((overview) => {
        if (isMounted && overview) {
          setSupportData({
            coffeeUrl:
              overview.settings?.support_coffee_url ||
              overview.profile?.coffeeUrl ||
              'pandey123@okhdfcbank',
            fullName: overview.profile?.fullName || 'Kanhaiya Pandey',
          });
        }
      })
      .catch(() => {
        // Fallback to default state
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const openSupport = () => setIsSupportOpen(true);
  const closeSupport = () => setIsSupportOpen(false);

  return (
    <SupportModalContext.Provider value={{ isSupportOpen, openSupport, closeSupport }}>
      {children}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={closeSupport}
        supportHandle={supportData.coffeeUrl}
        fullName={supportData.fullName}
      />
    </SupportModalContext.Provider>
  );
};

export const useSupportModal = (): SupportModalContextType => {
  const context = useContext(SupportModalContext);
  if (!context) {
    throw new Error('useSupportModal must be used within a SupportModalProvider');
  }
  return context;
};
