export interface ItemAnalitico {
  Loja: string;
  NumSaida: string;
  Data: string;
  Produto: string;
  Unidade: string;
  Quantidade: number;
  ValorUnitario: number;
  ValorTotal: number;
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}