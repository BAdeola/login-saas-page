import { getConnection } from '../config/db.js';
import sql from 'mssql';

export class DashboardService {
  
  // --- 1. ANÁLISE ANALÍTICA (Tabela de Itens Detalhada) ---
  async buscarAnalitico(codcli: string | number, dataInicio: string, dataFim: string) {
    const pool = await getConnection();
    const request = pool.request();

    request.input('dataInicio', sql.DateTime, dataInicio);
    request.input('dataFim', sql.DateTime, dataFim);

    let query = `
      SELECT 
        cl.nomfan as Loja, 
        c.numsai as NumSaida, 
        c.datsai as Data, 
        i.nompro as Produto, 
        i.unisai as Unidade, 
        CAST(i.quanti AS numeric(11, 2)) as Quantidade, 
        CAST((i.qtdsai * i.cusmed) AS NUMERIC(11,2)) as ValorUnitario, 
        CAST(((i.qtdsai * i.cusmed) * i.quanti) AS NUMERIC(11,2)) as ValorTotal
      FROM cadsai c
      INNER JOIN cadsai1 i ON c.numsai = i.numsai
      INNER JOIN cadcli cl ON c.codcli = cl.codcli
      WHERE c.datsai BETWEEN @dataInicio AND @dataFim
    `;

    // Lógica para filtrar por uma loja específica ou todas
    if (codcli !== 'TODAS') {
      request.input('codcli', sql.Numeric, codcli);
      query += ` AND c.codcli = @codcli`;
    }

    query += ` ORDER BY c.datsai DESC, c.numsai DESC`;

    const result = await request.query(query);
    return result.recordset;
  }

  // --- 2. ANÁLISE SINTÉTICA (Gráficos e Resumo) ---
  async buscarSintetico(codcli: string | number, dataInicio: string, dataFim: string) {
    const pool = await getConnection();
    const request = pool.request();

    request.input('dataInicio', sql.DateTime, dataInicio);
    request.input('dataFim', sql.DateTime, dataFim);

    if (codcli === 'TODAS') {
      // VISÃO PIZZA: Agrupado por Nome Fantasia da Loja
      const query = `
        SELECT 
          cl.nomfan as Loja, 
          COUNT(DISTINCT c.numsai) as NumSaidas, 
          SUM(c.valtot) as ValorTotal
        FROM cadsai c
        INNER JOIN cadcli cl ON c.codcli = cl.codcli
        WHERE c.datsai BETWEEN @dataInicio AND @dataFim
        GROUP BY cl.nomfan
      `;
      const result = await request.query(query);
      return { tipo: 'PIZZA_GERAL', dados: result.recordset };
    } else {
      // VISÃO LINHA: Detalhe de uma loja específica por número de saída
      request.input('codcli', sql.Numeric, codcli);
      const query = `
        SELECT 
          c.numsai as NumSaida, 
          c.datsai as Data, 
          c.valtot as ValorTotal
        FROM cadsai c
        WHERE c.codcli = @codcli AND c.datsai BETWEEN @dataInicio AND @dataFim
        ORDER BY c.datsai ASC
      `;
      const result = await request.query(query);
      return { tipo: 'LINHA_LOJA', dados: result.recordset };
    }
  }
}