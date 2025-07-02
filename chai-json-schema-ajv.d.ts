declare namespace Chai {
    interface Assertion {
        jsonSchema(schema: object): Assertion;
    }
}