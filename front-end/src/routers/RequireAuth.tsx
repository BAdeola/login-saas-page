import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth/useAuthStore'; 

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  // MUDANÇA AQUI: Tiramos o "!user.token"
  if (!user) { 
    return <Navigate to="/dd/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};