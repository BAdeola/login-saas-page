import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../../services/api'; // Importação agora deve bater com o export
import { useAuthStore } from '../../../store/auth/useAuthStore'; // Importante para salvar o estado

export const useLogin = () => {
  const [apelid, setApelid] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser); // Função do seu Zustand

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await AuthService.login(apelid, senha);

      if (data.sucesso) {
        // Salvamos apenas os dados do usuário. O "token" está seguro no Cookie.
        const usuarioParaSalvar = { ...data.usuario };
        setUser(usuarioParaSalvar);
        navigate("/dashboards");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.erro || "Erro ao fazer login");
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
    isErrorOpen: !!errorMessage,
    closeError,
    handleLogin
  };
};