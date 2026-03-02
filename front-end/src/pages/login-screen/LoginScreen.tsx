import { motion } from "framer-motion"
import Login from "../../features/Login/Login"
import { useLogin } from "./hooks/useLogin"
import { ErrorModal } from "../../components/ErrorModal/ErrorModal"

const LoginScreen = () => {
    const { isErrorOpen, errorMessage, closeError, ...loginData } = useLogin(); 

    return (
        <motion.div
            initial={{ opacity: 0 }} // Começa invisível
            animate={{ opacity: 1 }} // Fica visível
            exit={{ opacity: 0 }}    // Desaparece ao sair
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {/* O componente de login recebe o resto da lógica */}
            <Login {...loginData} />

            {/* O Modal fica aqui no topo da árvore da página */}
            <ErrorModal 
              isOpen={isErrorOpen} 
              message={errorMessage} 
              onClose={closeError} 
            />
        </motion.div>
    )
}

export default LoginScreen