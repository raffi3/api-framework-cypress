/// <reference types="cypress" />

/**
 * @description Products API controllers (cypress custom commands).
 * Handdles request to endpoint and basic response validation (status code, schema structure & data types check).
 */
import { productSchemas } from '../schemas/productSchemas';
import { ProductDataRequestBodyPayload } from '../interfaces/payloads/productData.interface';
import { ValidationHelper } from '../helpers/ValidationHelper';
import { ChaiSchema } from '../interfaces/response-schemas/schemas.interface';

/**
 * Controller: get a single product by its ID.
 * @param {number} productId - The ID of the product to retrieve.
 */
Cypress.Commands.add('getSingleProduct', (
    productId: number,
    expectedStatusCode: number = 200, 
    expectedResponseSchema: ChaiSchema = productSchemas.product
  ) => {
    return cy.request({ url: `/products/${productId}`, failOnStatusCode: false }).then((response) => {
      ValidationHelper.validateResponse(response, expectedResponseSchema, expectedStatusCode);
      return cy.wrap(response);
    });
});

/**
 * Controller: get a paginated list of all products.
 */
Cypress.Commands.add('getProducts', (queryParams: object = {}) => { 
  return cy.request({
    url: '/products',
    qs: queryParams,
  }).then((response) => {
      ValidationHelper.validateResponse(response, productSchemas.allProducts);
      return cy.wrap(response);
  });
});

/**
 * Controller: search for products.
 * @param {string} queryParams - The search keyword.
 */
Cypress.Commands.add('searchProducts', (queryParams: object = {}, isvalidateResponse: boolean = true) => {
  return cy.request({
    url: '/products/search',
    qs: queryParams
  }).then((response) => {
    if (isvalidateResponse)
      ValidationHelper.validateResponse(response, productSchemas.productsSearch);
    return cy.wrap(response);
  });
});

/**
 * Controller: get all product categories.
 */
Cypress.Commands.add('getProductCategories', () => {
  return cy.request('GET', '/products/categories').then((response) => {
    ValidationHelper.validateResponse(response, productSchemas.allProductsCategories);
    return cy.wrap(response);
  });
});

/**
 * Controller: add a new product.
 * @param {ProductData} productData - The data for the new product.
 */
Cypress.Commands.add('addProduct', (productData: ProductDataRequestBodyPayload) => {
  return cy.request('POST', '/products/add', productData).then((response) => {
    // Note: The dummy API returns the new product with an ID, but the schema doesn't require it on add.
    // The addProductSchema correctly validates the returned object structure.
    ValidationHelper.validateResponse(response, productSchemas.addProduct, 201);
    return cy.wrap(response);
  });
});

/**
 * Controller: update product.
 * @param {number} productId - The ID of the product to update.
 * @param {Partial<ProductData>} productData - The updated data for the product.
 */
Cypress.Commands.add('updateProduct', (productId: number, productData: Partial<ProductDataRequestBodyPayload>) => {
  return cy.request('PUT', `/products/${productId}`, productData).then((response) => {
    ValidationHelper.validateResponse(response, productSchemas.updateProduct);
    return cy.wrap(response);
  });
});

/**
 * Controller: delete product.
 * @param {number} productId - The ID of the product to delete.
 */
Cypress.Commands.add('deleteProduct', (productId: number) => {
  return cy.request('DELETE', `/products/${productId}`).then((response) => {
    ValidationHelper.validateResponse(response, productSchemas.deletedProduct);
    return cy.wrap(response);
  });
});


// Todo move to another file
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * @description: Custom Commands with descriptions
      */

      /**
       * Gets a single product by its ID and validates the response (status code, schema & data types).
       * @param productId The ID of the product.
       * @param (optional) expectedStatusCode Expected status code of response.
       * @param (optional) expectedResponseSchema Expected response schema.
       * @example cy.getSingleProduct(1)
       * @example cy.getSingleProduct(1000, 404, errorResponseSchema)
       */
      getSingleProduct(productId: number, expectedStatusCode?: number, expectedResponseSchema?: ChaiSchema): Chainable<Cypress.Response<any>>;
      /**
       * Gets all products and validates the response (status code, schema & data types).
       * @example cy.getProducts()
       */
      getProducts(queryParams?: object): Chainable<Cypress.Response<any>>;
      /**
       * Searches for products and validates the response (status code, schema & data types).
       * @param keyword The search keyword.
       * @example cy.searchProducts({q: 'phone'})
       */
      searchProducts(queryParams?: object, isvalidateResponse?: boolean): Chainable<Cypress.Response<any>>;
      /**
       * Gets all product categories and validates the response (status code, schema & data types).
       * @example cy.getProductCategories()
       */
      getProductCategories(): Chainable<Cypress.Response<any>>;
      /**
       * Adds a new product and validates the response (status code, schema & data types).
       * @param productData The product data to add.
       * @example cy.addProduct({ title: 'New Product' })
       */
      addProduct(productData: ProductDataRequestBodyPayload): Chainable<Cypress.Response<any>>;
      /**
       * Updates a product and validates the response (status code, schema & data types).
       * @param productId The ID of the product to update.
       * @param productData The data to update.
       * @example cy.updateProduct(1, { title: 'Updated Title' })
       */
      updateProduct(productId: number, productData: Partial<ProductDataRequestBodyPayload>): Chainable<Cypress.Response<any>>;
      /**
       * Deletes a product and validates the response (status code, schema & data types).
       * @param productId The ID of the product to delete.
       * @example cy.deleteProduct(1)
       */
      deleteProduct(productId: number): Chainable<Cypress.Response<any>>;
    }
  }
}
