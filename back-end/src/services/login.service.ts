import { getConnection } from '../config/db.js';
import sql from 'mssql';

export class LoginService {
  async executar(apelid: string, senha: string) {
    const pool = await getConnection();
    
    const result = await pool.request()
      .input('apelid', sql.VarChar, apelid)
      .input('senha', sql.VarChar, senha)
      .query(`
        SELECT nomusu
        FROM cadusu 
        WHERE apelid = @apelid AND senhas = @senha
      `);

    return result.recordset[0]; // Retorna o usuário ou undefined
  }
}