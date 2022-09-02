import { Request, Response } from "express";
import connection from '../dbStrategy/pg.js';
export async function teste(req:Request, res:Response) {
    const { authorization } = req.headers;
    const token:string = authorization?.replace('Bearer ', '');
    const nome =req.body
    try {
        console.log(nome)
        const a =await connection.query('select "apiKey" from companies where "apiKey" =$1',[token])
        if(a.rows.length===0){
            return res.status(401).send('key incorreta')
        }
        console.log(a.rows)
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.log('a')
        res.status(500).send(error)
    }
}

