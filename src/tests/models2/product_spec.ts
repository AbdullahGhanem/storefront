import { ProductStore } from '../../models/product';

const store = new ProductStore();

const products = [
    {
        name: 'Pro2',
        price: 20,
    },
];

describe('Product Model', () => {
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await store.create(products[0]);
        expect(result).toBeTruthy;
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        const p = jasmine.objectContaining(products[0]);
        expect(result).toContain(p);
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(2);
        const p = jasmine.objectContaining(products[0]);
        expect(result).toEqual(p);
    });
});
