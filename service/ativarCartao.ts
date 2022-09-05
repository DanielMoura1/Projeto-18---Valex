import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function ativarCartao(body:any) {
    const card =await connection.query('select * from cards where id =$1 ',[body.id])
    console.log(card.rows[0])
    //Somente cartões cadastrados devem ser ativados
    if(card.rows.length===0){
        //return res.status(401).send('cartao nao existe')
        throw { code: 'NotFound', message: 'cartao nao existe' }
    }
    //- Cartões já ativados (com senha cadastrada) não devem poder ser ativados de novo
    if(card.rows[0].password!=null){
        //return res.status(401).send('cartao ja ativado')
        throw { code: 'NotFound', message: 'cartao ja ativado' }
    }
    //Somente cartões não expirados devem ser ativados
    const date = new Date();
    const hoje = date.toLocaleDateString();
    const time=hoje.split("/")
    const cardValidade =card.rows[0].expirationDate
    if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
        //return res.status(401).send('cartao  fora da validade')
        throw { code: 'NotFound', message:'cartao  fora da validade'}
    }
    //O CVC deverá ser recebido e verificado para garantir a segurança da requisição
    if(body.cvc !=card.rows[0].securityCode){
        //return res.status(401).send('cvc invalido')
        throw { code: 'NotFound', message:'cvc invalido'}
    }
    //A senha do cartão deverá ser persistida de forma criptografado por ser um dado sensível
    const encryptedPassword = bcrypt.hashSync(body.senha, 10);
    console.log(encryptedPassword)
    //
    await connection.query('UPDATE cards SET password=$1  WHERE id = $2;',[encryptedPassword,body.id])
    await connection.query('UPDATE cards SET "originalCardId"=$1  WHERE id = $1;',[body.id])
    //UPDATE usuarios SET senh='010101' WHERE id = 2;
   


}