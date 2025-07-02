import { ProductApiWrapper } from '../../api-wrappers/productApiWrapper';
import { DataProviderHelper } from '../../helpers/DataProviderHelper';
import { ProductDataRequestBodyPayload } from '../../interfaces/payloads/productData.interface';
import '../../support/productApiController';

describe(`Add product functional tests`, () => {
    it(`Add product flow`, () => {
        cy.allure().description(`
        - Add a product
        - Verify response (status code, response structure, data types)
        - Verify product data in response
        - Verify id increments correctly
        - Get Product by ID
        - Verify newly added product is present 
        - Verify product data apprears correctly (on MOCK response)
        - Get All Products, verify newly added product is present (on MOCK response)
        `);
        const productDataBodyPayload: ProductDataRequestBodyPayload = DataProviderHelper.getProductRandomizedData();
        cy.addProduct(productDataBodyPayload).then((response) => {
            const responseBody = response.body;

            expect(responseBody, "Product data: Expected compared to /products/add response").contains(productDataBodyPayload); // resp has addtional property ID, so we use contains
            
            const productId: number = parseInt(responseBody.id);
            ProductApiWrapper.getProductsCount().then(totalNumberOfProducts => {
                expect(productId, "Newly added (incremented) product ID to be equal to total number of products + 1").equal(parseInt(totalNumberOfProducts) + 1);
            });
            productDataBodyPayload["id"] = productId;

            // Get Product by ID, verify newly added product is present and product data apprears correctly (on MOCK response)
            // cy.getSingleProduct(productId) - using mock instead as it doesn't return created product
            const mockProductData = structuredClone(productDataBodyPayload);
            expect(mockProductData, "Product data: Expected compared to get /products/{id} response").contains(productDataBodyPayload);
        
        
            // Get All Products verify newly added product is present (on MOCK response)
            ProductApiWrapper.getAllProducts().then((response) => {
                const responseBody = response.body;
                
                // responseBody.products to be used instead of MOCK in case add prduct starts really adding product 
                const mockAllProductsData = [
                    ...responseBody.products,
                    mockProductData
                ]
                const productsDataFromResponse = mockAllProductsData.filter(productsData => productsData.id == productId)

                expect(productsDataFromResponse.length, `Number of products with product ID "${productId}" in get /products response`).equal(1);
                expect(productDataBodyPayload, "Product data: Expected compared to object from get /products response").to.deep.equal(productsDataFromResponse[0]);
            });
        });
    });
});