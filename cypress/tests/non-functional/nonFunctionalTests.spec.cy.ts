import { ProductApiWrapper } from '../../api-wrappers/productApiWrapper';
import { DataProviderHelper } from '../../helpers/DataProviderHelper';
import { ProductDataRequestBodyPayload } from '../../interfaces/payloads/productData.interface';
import { faker } from "@faker-js/faker";
import '../../support/productApiController';

// Usefull for a qucik smoke test (can be used in CI when there is no need for a long testing)
// Tests are isolated from each other
describe('All Product endpoints non-functional tests ', () => {

    it('Get products', () => {
      cy.allure().description(`
        - Get products
        - Verify response status code, response structure, data types
      `)
      cy.getProducts();
    });

    it('Get a single product', () => {
      cy.allure().description(`
        - Get existing product Id (random)
        - Get a single product by the Id
        - Verify response status code, response structure, data types
      `);
      ProductApiWrapper.getRandomProductId().then(randomProductId => {
        cy.getSingleProduct(parseInt(randomProductId));
      });

    });

    it('Search for products', () => {
      cy.allure().description(`
        - Search for products by random query
        - Verify response status code, response structure, data types
      `);
      cy.searchProducts({q: faker.food.fruit()});
    });

    it('Limit and skip products', () => {
      cy.allure().description(`
        - Apply fiters on products: Limit and skip
        - Verify response status code, response structure, data types
      `);
      ProductApiWrapper.getProductsCount().then(productsCount => {
        const skipFirstNumberOfPrducts = faker.number.int(productsCount);
        cy.getProducts({
          skip: skipFirstNumberOfPrducts,
          limit: faker.number.int({min: skipFirstNumberOfPrducts, max: parseInt(productsCount)})
        });
      });
    });

    it('Get product categories', () => {
      cy.allure().description(`
        - Get product categories
        - Verify response status code, response structure, data types
      `);
        cy.getProductCategories()
    });

    it('Add a new product', () => {
      cy.allure().description(`
        - Add a new product
        - Verify response status code, response structure, data types
      `);
      const productDataBodyPayload: ProductDataRequestBodyPayload = DataProviderHelper.getProductRandomizedData();
      cy.addProduct(productDataBodyPayload)
    });

    it('Update a product', () => {
      cy.allure().description(`
        - Get existing product Id (random)
        - Update a product
        - Verify response status code, response structure, data types
      `);
      const updatedProductDataBodyPayload: ProductDataRequestBodyPayload = DataProviderHelper.getProductRandomizedData();
      ProductApiWrapper.getRandomProductId().then(randomProductId => {
        cy.updateProduct(parseInt(randomProductId), updatedProductDataBodyPayload);
      });
      
    });

    it('Delete a product', () => {
      cy.allure().description(`
        - Get existing product Id (random)
        - Delete a product
        - Verify response status code, response structure, data types
      `);
      ProductApiWrapper.getRandomProductId().then(randomProductId => {
        cy.deleteProduct(parseInt(randomProductId));
      });
    });

    // ToDo add more
    // it('Get product category-list', () => {
    // });  

    // it('Get all products in a specific category', () => {
    // });

    // it('sort products', () => {
    // });
});