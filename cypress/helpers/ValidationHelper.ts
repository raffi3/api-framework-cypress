import * as chai from 'chai';
import * as chaiJsonSchema from 'chai-json-schema-ajv';
chai.use(chaiJsonSchema);
const expect = chai.expect;

export class ValidationHelper {
    /**
     * @description: validates the API response (status code, schema structure & data types)
     * @param {Cypress.Response<any>} response - cypress response object.
     * @param {object} expectedSchema - The schema to validate against.
     */
    static validateResponse(response: Cypress.Response<any>, expectedSchema: object, expectedStatusCode: number = 200) {
      expect(response.status).to.eq(expectedStatusCode);
      expect(response.body).to.be.jsonSchema(expectedSchema);
    };
}