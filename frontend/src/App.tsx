import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SupportModalProvider } from './context/SupportModalContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';

import { DynamicBackground } from './components/common/DynamicBackground';
import { trackPortfolioVisit } from './services/api';

// Code-split admin pages so standard visitors don't download admin CMS code
const AdminLoginPage = React.lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage'));

const AdminLoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-bg text-white">
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping" />
        <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-blue-500 border-r-cyan-400 animate-spin" />
      </div>
      <p className="text-xs font-mono text-slate-400 tracking-wider">LOADING SECURE PORTAL...</p>
    </div>
  </div>
);

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

            {/* Admin Routes (Lazy Loaded) */}
            <Route
              path="/admin/login"
              element={
                <React.Suspense fallback={<AdminLoadingFallback />}>
                  <AdminLoginPage />
                </React.Suspense>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <React.Suspense fallback={<AdminLoadingFallback />}>
                    <AdminDashboardPage />
                  </React.Suspense>
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <React.Suspense fallback={<AdminLoadingFallback />}>
                  <AdminLoginPage />
                </React.Suspense>
              }
            />

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
