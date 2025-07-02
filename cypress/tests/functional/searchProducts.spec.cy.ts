import '../../support/productApiController';

describe('Search products functional tests', () => {
    const parametrizedCases = [
        { keyword: 'Apple', minResult: 1 },
        { keyword: 'MagSafe', minResult: 1 },
        { keyword: 'Essence', minResult: 1 },
        { keyword: 'Mirror', minResult: 1 },
        { keyword: 'notExistingKeyword', minResult: 0 },
    ];
    parametrizedCases.forEach(($case) => {
        it(`Search products by keyword "${$case.keyword}"`, () => {
            cy.allure().description(`
            - Search products by keyword ${$case.keyword}
            - Verify returned product to have the keyword in title and/or description
            `);
            cy.searchProducts({
                q: $case.keyword}).then((response) => {
                const responseBody = response.body;
                const selectedProducts = responseBody.products;
                expect(selectedProducts.length).to.be.at.least($case.minResult);
                
                selectedProducts.forEach(product => {
                    expect(`${product.title} ${product.description}`, `Keyword "${$case.keyword}" in product title and/or description`).contains($case.keyword);
                });
            });
        });
    });
});