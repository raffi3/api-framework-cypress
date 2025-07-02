import { ProductApiWrapper } from '../../api-wrappers/productApiWrapper';
import { DataProviderHelper } from '../../helpers/DataProviderHelper';
import { ProductDataRequestBodyPayload } from '../../interfaces/payloads/productData.interface';
import { productSchemasNegative } from '../../schemas/productSchemasNegative';
import '../../support/productApiController';

describe(`Delete product functional tests`, () => {
    it(`Delete product flow`, () => {
        cy.allure().description(`
            - Add a product, get Id
            - Delete the product by Id (Use mocked id instead as Add product does not really create a product)
            - Verify response (status code, response structure, data types)
            - Verify relevant product data appears in response
            - Get Product by ID, verify product does not exisit
            - Verify error response (status code, response structure, error message)
        `);
        const productDataBodyPayload: ProductDataRequestBodyPayload = DataProviderHelper.getProductRandomizedData();

        cy.addProduct(productDataBodyPayload).then((response) => {
            const responseBody = response.body;

            const productId: number = parseInt(responseBody.id);
            // Use newly added id in case Add Product starts really creating a new product
            const productIdMock: number = productId-1; // Mock (here we do know that productId-1 exists)

            cy.deleteProduct(productIdMock).then((response) => {
                expect(response.body.id, "Product data: Expected compared to DELETE /products/{id} response").equals(productIdMock);
                expect(response.body.isDeleted, "Product data: isDeleted property in DELETE /products/{id} response").to.be.true;
                
                // Get Product by ID, verify product does not exisit
                cy.getSingleProduct(productId, 404, productSchemasNegative.product);
            });
        });
    });
});