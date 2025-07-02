export class AssertionWrapper {
    static assertArrayHasOneOrMoreObjectByProperty(array: Array<any>, property: string, value: any, contextMsg: string): Array<object> {
        const filtered = array.filter(item => item[property] == value);    
        expect(filtered.length, `${contextMsg}: Could not find object in array with key-value pair '${property}': ${value} \n array: ${JSON.stringify(array)}`).greaterThan(1);
        return filtered;
    }
}