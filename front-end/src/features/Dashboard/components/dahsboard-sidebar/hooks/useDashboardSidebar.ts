import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../../../../../store/dashboard/useDashboardStore';

export const useDashboardSidebar = () => {
  const navigate = useNavigate();
  
  // Puxamos tudo o que a Sidebar precisa da Store Global
  const { 
    filtros, 
    setFiltros, 
    gerarAnalise, 
    error, 
    loading, 
    limparDados, 
    sidebarOpen, 
    setSidebarOpen 
  } = useDashboardStore();

  // Memória para o nome do usuário vindo do Crachá (localStorage)
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

  // Função para disparar a busca
  const handleAnalisar = (e: React.FormEvent) => {
    e.preventDefault();
    gerarAnalise(); 
  };

  // Função para sair do sistema (Logoff)
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