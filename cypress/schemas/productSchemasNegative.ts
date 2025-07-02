/** 
 * @description: Response schema definitions
 */

import { ChaiSchema } from "../interfaces/response-schemas/schemas.interface";

export const productSchemaNegative: ChaiSchema = {
    title: 'Product Not Found Schema',
    description: 'Product is not found by its ID error schema',
    type: 'object',
    properties: {
        message: {
            type: 'string',
            pattern: "^Product with id '\\d+' not found$",
        },
    },
    required: ['message']
};


export const productSchemasNegative = {
    product: productSchemaNegative
};