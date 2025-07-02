export interface ChaiSchema {
    title: string;
    description: string;
    type: string;
    minItems?: number;
    properties?: object;
    required?: Array<string>;
    items?: object;
}