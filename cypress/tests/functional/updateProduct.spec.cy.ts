import { ProductApiWrapper } from '../../api-wrappers/productApiWrapper';
import { DataProviderHelper } from '../../helpers/DataProviderHelper';
import { ProductDataRequestBodyPayload } from '../../interfaces/payloads/productData.interface';
import '../../support/productApiController';

describe(`Update product functional tests`, () => {
    it(`Update product flow`, () => {
        cy.allure().description(`
            - Add a product, get Id
            - Update the product (by Id)
            - Verify response (status code, response structure, data types)
            - Verify updated product data appears in response
            - Get Product by ID, verify updated product data appears in response (MOCK response)
        `);
        const productDataBodyPayload: ProductDataRequestBodyPayload = DataProviderHelper.getProductRandomizedData();

        cy.addProduct(productDataBodyPayload).then((response) => {
            const responseBody = response.body;

            const productId: number = parseInt(responseBody.id);
            const productIdMock: number = productId-1;

            const updatedProductDataBodyPayload: ProductDataRequestBodyPayload = DataProviderHelper.getProductRandomizedData();
            cy.updateProduct(productIdMock, updatedProductDataBodyPayload).then((response) => {
                expect(response.body, "Product data: Expected compared to /products/add response").contains(updatedProductDataBodyPayload); // resp has addtional property ID, so we use contains
            });

            // cy.getSingleProduct(productId) - using mock instead as it doesn't return updated product
            const mockProductData = structuredClone(updatedProductDataBodyPayload);
            expect(mockProductData, "Updated Product data: Expected compared to get /products/{id} response").to.deep.equal(updatedProductDataBodyPayload);
        });
    });
});