import { connection } from "../database.js";
import * as repositories from '../repositories/meusRepos.js';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
export async function verificaCVC(card:any,body:any) {
    if(body.cvc !=card.rows[0].securityCode){
        //return res.status(401).send('cvc invalido')
        throw { code: 'NotFound', message:'cvc invalido'}
    }
}