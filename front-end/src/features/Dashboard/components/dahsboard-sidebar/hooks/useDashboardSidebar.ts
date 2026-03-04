import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../../../../../store/dashboard/useDashboardStore';

export const useDashboardSidebar = () => {
  const navigate = useNavigate();
  
  const { 
    filtros, 
    setFiltros, 
    buscarTabela, // Mudamos aqui!
    error, 
    loading, 
    limparDados, 
    sidebarOpen, 
    setSidebarOpen 
  } = useDashboardStore();

  const nomeUsuario = useMemo(() => {
    const usuarioSalvo = localStorage.getItem('@DDCD:user');
    if (usuarioSalvo) {
      try {
        const usuarioParsed = JSON.parse(usuarioSalvo);
        return usuarioParsed.nomusu || 'Usuário';
      } catch (e) {
        return 'Usuário';
      }
    }
    return 'Usuário';
  }, []);

  const handleAnalisar = (e: React.FormEvent) => {
    e.preventDefault();
    // Agora ele dispara apenas a busca da tabela inicial
    buscarTabela(); 
  };

  const handleLogout = () => {
    localStorage.removeItem('@DDCD:user'); 
    limparDados(); 
    navigate('/'); 
  };

  return {
    filtros,
    setFiltros,
    loading,
    error,
    sidebarOpen,
    setSidebarOpen,
    nomeUsuario,
    handleAnalisar,
    handleLogout
  };
};