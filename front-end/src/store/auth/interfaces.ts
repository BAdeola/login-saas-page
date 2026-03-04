export interface User {
  id: string;
  nome: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}