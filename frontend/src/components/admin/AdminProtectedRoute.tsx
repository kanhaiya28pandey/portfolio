import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('admin_jwt');
  const sessionActive = sessionStorage.getItem('admin_session_active') === 'true';

  if (!token || !sessionActive) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};
