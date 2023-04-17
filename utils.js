import { fileURLToPath } from 'url';
import { dirname } from 'path';
import joi from "joi"

const product = joi.object({
    title: joi.string().min(1).max(200).required(),
    description: joi.string().min(1).max(200).required(),
    code: joi.string().min(1).max(50).required(),
    price: joi.number().required(),
    status: joi.boolean().required().default(true),
    stock: joi.number().required(),
    category: joi.string().required(),
    thumbnails: joi.string().required()
})




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const joiValidator = { product }

export default __dirname;

