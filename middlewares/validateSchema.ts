import { any } from "joi";

export default function validateSchema(schema:any) {
    return (req:Request, res:any, next:any) => { 
        const {error} = schema.validate(req.body, {abortEarly: false});
        
        if (error) {
          return res.status(422).send(error.details.map((detail: { message: any; }) => detail.message));
        }
    
        next();
    }
}