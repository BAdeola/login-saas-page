import React, { type JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();
  
  // Aqui você verifica como o seu sistema sabe que o usuário está logado.
  // Pode ser um token no localStorage, ou um estado no Zustand!
  // Exemplo: pegando um dado que o seu AuthService salva no login.
  const isAuth = localStorage.getItem('@DDCD:user');

  if (!isAuth) {
    // Se não estiver logado, redireciona para a raiz ("/")
    // O 'replace' evita que o usuário use o botão "Voltar" do navegador para tentar burlar
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Se tem o token/usuário, deixa passar e renderiza a tela!
  return children;
};