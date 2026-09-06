import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SupportModalProvider } from './context/SupportModalContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';

import { DynamicBackground } from './components/common/DynamicBackground';
import { trackPortfolioVisit } from './services/api';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    const hasTracked = sessionStorage.getItem('portfolio_visited_session');
    if (!hasTracked) {
      sessionStorage.setItem('portfolio_visited_session', 'true');
      trackPortfolioVisit(window.location.pathname, document.referrer);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-dark-bg light:bg-light-bg text-dark-text light:text-light-text font-sans antialiased selection:bg-blue-500 selection:text-white">
      <DynamicBackground />
      <Navbar />
      <main className="relative z-10 flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SupportModalProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Portfolio Route */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardPage />
                </AdminProtectedRoute>
              }
            />
            <Route path="/admin" element={<AdminLoginPage />} />

            {/* Fallback to Home */}
            <Route
              path="*"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </SupportModalProvider>
    </ThemeProvider>
  );
};

export default App;
