import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function verificaValidade(card:any,body:any) {
    const date = new Date();
    const hoje = date.toLocaleDateString();
    const time=hoje.split("/")
    const cardValidade =card.rows[0].expirationDate
    if(time[1] >= cardValidade[1] && time[0] > cardValidade[0]){
        //return res.status(401).send('cartao  fora da validade')
        throw { code: 'NotFound', message:'cartao  fora da validade'}
    }

}