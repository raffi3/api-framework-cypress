/** 
 * @description: Response schema definitions
 */

import { ChaiSchema } from "../interfaces/response-schemas/schemas.interface";

// GET /products/{id}
export const productSchema: ChaiSchema = {
    title: 'Product Schema',
    description: 'Single product object structure',
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        discountPercentage: { type: 'number' },
        rating: { type: 'number' },
        stock: { type: 'number' },
        brand: { type: 'string' },
        category: { type: 'string' },
        thumbnail: { type: 'string'},
        images: {
            type: 'array',
            items: { type: 'string'},
        },
    },
    required: [
        'id',
        'title',
        'description',
        'price',
        'discountPercentage',
        'rating',
        'stock',
        // 'brand', // Bug: 90 Products out of 194 missing property “brand” (“id”: 16, “id”: 17 etc.) 
        'category',
        'thumbnail',
        'images',
    ],
};

//  GET /products
export const getAllProductsSchema: ChaiSchema = {
    title: 'Get All Products Schema',
    description: 'Represents list of products response structure',
    type: 'object',
    properties: {
        products: {
            type: 'array',
            items: productSchema, 
        },
        total: { type: 'number' },
        skip: { type: 'number' },
        limit: { type: 'number' },
    },
    required: ['products', 'total', 'skip', 'limit'],
};

// GET /products/search
export const productsSearchSchema: ChaiSchema = {
    ...getAllProductsSchema // for now they are the same, can be extended in future if any change
}

// GET /products/categories
export const allProductsCategoriesSchema: ChaiSchema = {
    title: 'Product all products categories schema',
    description: 'All product categories structure',
    type: "array",
    minItems: 1,
    items: {
        type: "object",
        required: ["slug", "name", "url"],
        properties: {
            slug: { "type": "string" },
            name: { "type": "string" },
            url:  { "type": "string" }
        }
    }
};

// GET /products/category-list
export const productCategoryListSchema: ChaiSchema = {
    title: 'Product category list schema',
    description: 'Product category-list structure',
    type: 'array',
    items: { type: 'string' }
};

// POST /products/add
export const addProductSchema: ChaiSchema = {
    ...productSchema,
    title: 'Add Product Schema',
    description: 'Add product response structure',
    required: ['id']
};

// PUT /products/{id}
export const updateProductSchema: ChaiSchema = {
    ...productSchema, 
    title: 'Update Product Schema',
    description: 'Updated product response structure',
};


// DELETE /products/{id}
export const deletedProductSchema: ChaiSchema = {
    title: 'Deleted Product Schema',
    description: 'Delete product response structure',
    type: 'object',
    properties: {
        ...productSchema.properties,
        isDeleted: { type: 'boolean' },
        deletedOn: { type: 'string' },
    },
    required: [
        ...productSchema.required,
        'isDeleted',
        'deletedOn'
    ],
};

export const productSchemas = {
    product: productSchema,
    allProducts: getAllProductsSchema,
    productsSearch: productsSearchSchema,
    allProductsCategories: allProductsCategoriesSchema,
    productCategoryList: productCategoryListSchema,
    addProduct: addProductSchema,
    updateProduct: updateProductSchema,
    deletedProduct: deletedProductSchema,
};