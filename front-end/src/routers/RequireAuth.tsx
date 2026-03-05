import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth/useAuthStore'; 

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  // MUDANÇA: Não verificamos mais o token, apenas se o objeto user existe
  if (!user) { 
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};