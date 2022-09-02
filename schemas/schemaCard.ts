import joi from 'joi';

const cardSchema = joi.object({
    "employeeId": joi.number().integer().required(),  
    "type": joi.string().required()
});

export default cardSchema;