import { getConnection } from '../config/db.js';

export class LojaService {
  async buscarTodas() {
    const pool = await getConnection();
    
    // Trazendo o código e o nome fantasia, ordenados em ordem alfabética
    const result = await pool.request().query(`
      SELECT 
        codcli as id, 
        nomfan as nome 
      FROM cadcli
      ORDER BY nomfan ASC
    `);

    return result.recordset;
  }
}