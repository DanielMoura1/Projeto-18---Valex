import { Request, Response } from "express";
import connection from '../dbStrategy/pg.js';
export async function teste(req:Request, res:Response) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try {
        const a =await connection.query('select * from businesses')
        console.log(a.rows)
        res.status(201).send('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.log('a')
        res.status(500).send(error)
    }
}

