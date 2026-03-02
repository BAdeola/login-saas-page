import { motion } from "framer-motion";
import DashboardPage from "../../features/Dashboard/DashBoardPage";
import { useDashboardLojas } from "./hooks/useDashBoardPageScreen"; // Importando o seu novo Hook

const DashBoardPageScreen = () => {
    // 1. O Hook faz todo o trabalho sujo e nos entrega os dados mastigados
    const { lojas, carregandoLojas } = useDashboardLojas();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {/* 2. Repassamos para a Feature desenhar a tela */}
            <DashboardPage lojas={lojas} carregandoLojas={carregandoLojas} />
        </motion.div>
    );
};

export default DashBoardPageScreen;