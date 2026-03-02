import React from 'react';
import { DashboardSidebar } from './components/DashboardSidebar';
import { DashboardMain } from './components/DashboardMain';

interface DashboardPageProps {
  lojas: any[];
  carregandoLojas: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ lojas, carregandoLojas }) => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-emerald-950 via-teal-950 to-neutral-900 p-4 md:p-6 flex justify-center overflow-hidden">
      <div className="w-full max-w-400 flex flex-col md:flex-row gap-6 h-[calc(100vh-3rem)]">
        <DashboardSidebar lojas={lojas} carregandoLojas={carregandoLojas} />
        <DashboardMain />
      </div>
    </div>
  );
};

export default DashboardPage;