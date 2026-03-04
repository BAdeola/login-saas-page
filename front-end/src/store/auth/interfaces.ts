export interface User {
  id?: number;
  token?: string;
  nomusu?: string;
  apelid?: string; 
  nome?: string;
}

export interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}