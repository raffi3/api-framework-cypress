# api-framework-cypress
Scalable and easy maintainable API automation framework showcasing API automation techniques on Public API (https://dummyjson.com/docs/products)

## Installation
#### Install Cypress
https://docs.cypress.io/app/get-started/install-cypress

#### Install dependencies
`npm install`

## Execution
#### Run Cypress UI:
`npx cypress open`

#### Run Cypress command line:
`npx cypress run`

To run specific test case file: 

`npx cypress run --spec "<path-to-file>.cy.ts`

## Description
### Methods and strategy used:
- Data transfer object handling methodology (DTO), namely, response structure and data types validation through Chai provided response structure (similar to what Python Marshmallow provides)
- Reusable API controller methods 
- Tests isolation (ensuring each test runs independently and doesn't interfere with the results of other tests)
- Mocking strategy for response validation as in a few cases backend does’t provide expected functionality (e.g add product does’t really create product in this public API, so stubbing response to include newly added product in GET /products/{ID} and GET /products)
- Functional tests that cover e2e functionality of endpoints (scenarios below)
- Non-functional tests (light tests - 1 per each endpoint that are checking endpoint health - status code and response structure with data types)
- Typescript benefits (data types specification via interfaces and not only, etc.)
- Reporting tool Allure (well integratable with CI tools e.g. Jenkins)
- Test parameterization method: In order to handle multiple cases for positive and negative scenarios to reach higher coverage
    - Represented in test: searchProducts.spec.cy.ts & getAllProducts.spec.cy.ts
- CI integration (Github actions)

### Further points to be done to strengthen the framework:
- Query params interfaces describing possible values per each query param (using custom created type or enum) 
- Multi-env support (dev, stage, prod). To keep config for each env (URL and relevant data).
- Data storage for sensitive data like credentials (this public API does not require any) in file system (without pushing into repo) or 3rd party tools gathered via API (e.g. 1pass, last pass),  in CI flow can be stored in appropriate secret variables section (encrypted). 
- Advanced CI/CD support (tests to be connected to backend pipeline, e.g. webhook trigger set on PR creation - provides early testing at and bugs discovery)
- Linter for better code quality
- AI PR reviewer for initial feedback

### Example of e2e functional scenarios (detailed description can be found inside each test in allure description):
- Add product: Add product, get that product (by id), get all products check presence inside
- Update  product: Add product, Update, get that product (by id), check updated data
- Delete product: Add product, Delete, Get that product, check absence
- etc.

### Bugs tests discovered:
- Get all products endpoint: 90 Products out of 194 missing property “brand” (e.g. product with “id”: 16, or “id”: 17) 
- Get all products endpoint: For several cases skip filter is not working as expected. E.g. when skip: 10, limit: 100 (is not skipping products from response and returns 100 products), but when skip is 10 and limit 194, returns 184)

NOTE: All product related API controller methods are kept into a single file as there are not many endpoints, nevertheless, with growth its better to have them separated (the same for response schemas).