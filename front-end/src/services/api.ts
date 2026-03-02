const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  async login(apelid: string, senha: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apelid, senha }),
    });

    // Se o status não for 2xx, o fetch não joga erro sozinho, precisamos tratar
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || "Falha na autenticação");
    }

    return response.json();
  }
};