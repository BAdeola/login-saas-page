import { useNavigate } from 'react-router-dom';
import { useDashboardStore } from '../../../../../store/dashboard/useDashboardStore';
import { useAuthStore } from '../../../../../store/auth/useAuthStore'; // ⬅️ Importamos o seu auth store!

export const useDashboardSidebar = () => {
  const navigate = useNavigate();
  
  const { 
    filtros, 
    setFiltros, 
    buscarTabela, 
    error, 
    loading, 
    limparDados, 
    sidebarOpen, 
    setSidebarOpen 
  } = useDashboardStore();

  // 👇 Olha como fica infinitamente mais limpo! O Zustand já te dá o usuário pronto:
  const { user, logout } = useAuthStore();
  
  // Tenta pegar o nomusu, se não tiver tenta o apelid, se não tiver cai no 'Usuário'
  const nomeUsuario = user?.nomusu || user?.apelid || 'Usuário';

  const handleAnalisar = (e: React.FormEvent) => {
    e.preventDefault();
    buscarTabela(); 
  };

  const handleLogout = () => {
    logout(); // ⬅️ Usamos a função oficial de logout do Zustand (que já limpa o localStorage)
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