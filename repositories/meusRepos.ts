import { connection } from "../database.js";

export async function VerificarPertenceEmpresa(token: string) {
    
    console.log('meu res')
     //- A chave de API deve pertencer a alguma empresa
const companie =await connection.query('select * from companies where "apiKey" =$1',[token])

return companie.rows;
}