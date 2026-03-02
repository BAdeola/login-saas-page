import { useState, useEffect } from "react";
import { LojaService, type Loja } from "../../../services/LojaService"; 
// 1. Importe a sua Store Global aqui
import { useDashboardStore } from "../../../store/dashboard/useDashboardStore"; 

export const useDashboardLojas = () => {
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [carregandoLojas, setCarregandoLojas] = useState(true);

    // 2. Puxa a função de limpeza do Zustand
    const { limparDados } = useDashboardStore();

    useEffect(() => {
        limparDados(); // Limpa tudo quando ENTRAR na tela

        return () => {
            limparDados(); // Limpa tudo quando SAIR da tela
        };
    }, []); // Array vazio garante que só roda na entrada e saída

    useEffect(() => {
        const carregarLojas = async () => {
            try {
                const dados = await LojaService.buscarLojas();
                setLojas(dados);
            } catch (error) {
                console.error("Erro ao buscar lojas:", error);
            } finally {
                setCarregandoLojas(false);
            }
        };

        carregarLojas();
    }, []);

    // 3. Retorna apenas o que a tela precisa para desenhar os filtros
    return { lojas, carregandoLojas };
};