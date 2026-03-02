import { useState, useEffect } from "react";
// Importe a interface Loja que criamos no seu Service
import { LojaService, type Loja } from "../../../services/LojaService"; 

export const useDashboardLojas = () => {
    // 1. O SEGREDO ESTÁ AQUI: <Loja[]>
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [carregandoLojas, setCarregandoLojas] = useState(true);

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

    return { lojas, carregandoLojas };
};