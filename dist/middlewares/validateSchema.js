import cardSchema from "../schemas/schemaCard";
export default function validateSchema(req, res, next) {
    var validation = cardSchema.validate(req.body);
    if (validation.error) {
        return res.status(422).send("oi XxxX oi");
    }
    return next();
}
