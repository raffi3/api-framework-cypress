
import { faker } from "@faker-js/faker";
import { ProductDataRequestBodyPayload } from "../interfaces/payloads/productData.interface";

export class DataProviderHelper {
    
    static getProductRandomizedData(): ProductDataRequestBodyPayload  {
        return {    
            "title": faker.commerce.productName(),
            "description": faker.commerce.productDescription(),
            "price": parseInt(faker.commerce.price()),
            // Todo add more
        }
    }
}