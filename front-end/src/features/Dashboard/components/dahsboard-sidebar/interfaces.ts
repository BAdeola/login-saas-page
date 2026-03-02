export interface SidebarProps {
  lojas: any[];
  carregandoLojas: boolean;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}