import { faker } from "@faker-js/faker";
import '../support/productApiController';

export class ProductApiWrapper {

    static getAllProducts() {
        return cy.getProducts({limit: 0});
    }

    static getProductsCount() {
        return this.getAllProducts().then(response => cy.wrap((response.body.products).length));
    }

    private static getExisitngProductIds() {
        return this.getAllProducts().then(response => {
            const productIds = response.body.products.map(product => product.id);
            return cy.wrap(productIds);
        });
    }

    static getRandomProductId() {
        return this.getExisitngProductIds().then(productIds => {
            const randomIndex = faker.number.int(productIds.length-1);
            return cy.wrap(productIds[randomIndex]);
        });
    }
}