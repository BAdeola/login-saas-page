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
      // No seu useLogin.ts, dentro do handleLogin:

      console.log("📦 Dados que chegaram do Back-end:", data);
      if (data.sucesso) {
        const usuarioParaSalvar = {
          ...data.usuario,
          token: data.token // Agora o dado existe vindo do back!
        };
        setUser(usuarioParaSalvar);
        navigate("/dashboards");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Usuário ou senha inválidos");
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