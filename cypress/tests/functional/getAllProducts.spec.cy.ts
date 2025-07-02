import { ProductApiWrapper } from '../../api-wrappers/productApiWrapper';
import { faker } from "@faker-js/faker";
import '../../support/productApiController';

describe('Get products functional tests', () => {
    it(`Get products without query params`, () => {
            cy.getProducts();
    });

    const parametrizedCases = [ // could've been generated with random set (if below bug was not present)
        { skip: 0, limit: 1 },
        // { skip: 10, limit: 100 }, // bug case not skipping
        { skip: 0, limit: 194 },
        { skip: 194, limit: 194 },
    ];
    parametrizedCases.forEach(($case) => {
        it(`Get products with query params (limit: '${$case.limit}' and skip: '${$case.skip}')`, () => {
            cy.allure().description(`
                - Get products with query params (limit: '${$case.limit}' and skip: '${$case.skip}')
                - Verify filtered products count in response (count = limit - skip)
                - Verify skip & limit properities calculation in response
            `);
            cy.getProducts({
                skip: $case.skip,
                limit: $case.limit,
            }).then(response => {
                // Verify filtered products count in response
                expect(
                    (response.body.products).length, `
                    Products count based on limit: '${$case.limit}' and skip: '${$case.skip}' query params`
                ).equal(Math.abs($case.limit - $case.skip));
            
                // Verify skip & limit properities calculation in response
                expect(response.body.skip, 'skip property in response').equal($case.skip);
                expect(response.body.limit, 'limit property in response').equal(Math.abs($case.limit - $case.skip));
            });
        });
    });
});
