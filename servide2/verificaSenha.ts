import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function verificaSenha(card:any,body:any) {
    if(card.rows[0].password!=null){
        //return res.status(401).send('cartao ja ativado')
        throw { code: 'NotFound', message: 'cartao ja ativado' }
    }
}