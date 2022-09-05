import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
export async function criarCartao(token: string,body:any) {
     //- A chave de API deve pertencer a alguma empresa
     

     
console.log('oi')
const companie =await repositories.VerificarPertenceEmpresa(token)
console.log(companie.length)
if(companie.length===0){
     throw { code: 'NotFound', message: 'key incorreta' }
     //return res.status(401).send('key incorreta')
 }
 console.log('oi4')
        
 console.log('oi5')
 //- Somente empregados cadastrados podem ter cartões
 const employee =await connection.query('select * from employees where id =$1',[body.employeeId])
 console.log('oi6')
 if(employee.rows.length===0){
     throw { code: 'NotFound', message: 'voce nao existe' }
     //return res.status(401).send('voce nao existe')
 }
 console.log('oi7')
 if(companie[0].id !=employee.rows[0].companyId){
     throw { code: 'NotFound', message: 'key incorreta' }
     //return res.status(401).send('key incorreta')
 }
 console.log('oi8')
 //Empregados não podem ter mais de um cartão do mesmo tipo
 const card =await connection.query('select * from cards where "employeeId" =$1 AND type =$2',[body.employeeId,body.type])
 console.log('oi9')
 if(card.rows.length>0){
     throw { code: 'NotFound', message: 'Não pode ter mais de um cartão do mesmo tipo' }
     //return res.status(401).send('Não pode ter mais de um cartão do mesmo tipo')
 }//
 console.log('oi10')
 
 const date = new Date();
 const hoje = date.toLocaleDateString();
 const time=hoje.split("/")
 const DataDeValidade= time[1]+"/"+(parseInt(time[2])+5)
 console.log(DataDeValidade)
 const number = faker.random.numeric(16);
 const securityCode = faker.random.numeric(4)
 console.log(number)
 console.log(body)
 console.log(securityCode)
 const fullname =employee.rows[0].fullName.split(" ")
 const namec =fullname[0]+' '+fullname[(fullname[1].length >= 3 ? 1 : 2)][0]+' '+fullname[fullname.length-1]
 console.log(namec.toUpperCase())
 
 //
 console.log('oi11')
 const resposta ={
     employeeId:employee.rows[0].id,
     number:number,
     cardholderName:namec.toUpperCase(),
     securityCode:securityCode,
     expirationDate:DataDeValidade,
     password:null,
     isVirtual:true,
     originalCardId:null,
     isBlocked:false,
     type:body.type

 }

return resposta;

}