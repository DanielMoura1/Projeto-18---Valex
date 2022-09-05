import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function SomenteCartaoAtivos(body:any) {
    const card =await connection.query('select * from cards where id =$1 ',[body.id])
    console.log(card.rows[0])
    //Somente cartões cadastrados devem ser ativados
    if(card.rows.length===0){
        //return res.status(401).send('cartao nao existe')
        throw { code: 'NotFound', message: 'cartao nao existe' }
    }
    return card
}