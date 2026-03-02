import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../services/api';

export const useLogin = () => {
  const [apelid, setApelid] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Novos estados para o Modal de Erro
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isErrorOpen = !!errorMessage; // Se tiver mensagem, está aberto

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await AuthService.login(apelid, senha);
      if (data.sucesso) {
        localStorage.setItem('@DDCD:user', JSON.stringify(data.usuario));
        navigate("/dashboards");
      }
    } catch (error: any) {
      // Em vez de alert(), setamos a mensagem no estado
      setErrorMessage(error.message || "Erro inesperado ao tentar logar.");
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => setErrorMessage(null);

  return {
    apelid, setApelid,
    senha, setSenha,
    loading,
    errorMessage: errorMessage || '',
    isErrorOpen,
    closeError,
    handleLogin
  };
};