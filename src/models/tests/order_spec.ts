import { OrderStore } from '../order';
import { UserStore } from '../user';
import { ProductStore } from '../product';
import client from '../../database';


const orderstore = new OrderStore();
const productstore = new ProductStore();
const userstore = new UserStore();


describe('Order Model', () => {
    beforeAll(async () => {
        await userstore.create({
            username: 'abdullahghanem',
            password: '123456789'
        });

        await productstore.create({
            name: 'newproduct',
            price: 1
        });
    });


    it('should have an index method', () => {
        expect(orderstore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(orderstore.show).toBeDefined();
    });

    it('create method should add an order', () => {
        expect(orderstore.create).toBeDefined();
    });

    it('should add product method', () => {
        expect(orderstore.addProduct).toBeDefined();
    })
    it('should have a delete method', () => {
        expect(orderstore.delete).toBeDefined();
    });

    it('create method should add an order', async () => {
        const result = await orderstore.create({
            user_id: '1',
            status: 'active',
        });
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'active'
        });
    });

    it('index method should return a list of orders', async () => {
        const result = await orderstore.index();
        expect(result).toEqual([
            { id: 1, status: 'active', user_id: '1' }
        ]);
    });

    it('should show the correct order', async () => {
        const result = await orderstore.show(1);
        expect(result).toEqual({
            id: 1,
            status: 'active',
            user_id: '1'
        });
    });

    it('delete method should remove the product', async () => {
        await orderstore.delete(1);
        const result = await orderstore.index();
        expect(result).toEqual([]);
    });
    afterAll(async () => {
        const connection = await client.connect();
        connection.query('Delete from users');
        connection.query('Delete from products');
        connection.query('Delete from order_products');
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
        await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        await connection.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1');
        connection.release();
    });
});


