import client from '../database'

export type Order = {
    id?: number;
    status: string;
    user_id: string;
}

export type addProduct = {
    id?: number;
    quantity: number;
    order_id: string;
    product_id: string;
    user_id: number
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders. Erorr: ${err}`)
        }
    }

    async show(id: any): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`)
        }
    }

    async create(OrderStore: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO Orders (user_id, status) VALUES($1, $2) RETURNING *';
            const conn = await client.connect();
            const result = await conn.query(sql, [OrderStore.user_id, OrderStore.status])
            const order = result.rows[0];
            conn.release();
            return order;
        } catch (err) {
            throw new Error(`Could not add new order ${OrderStore.user_id}. Error: ${err}`)
        }
    }

    async addProduct(add: addProduct): Promise<{ id?: number, user_id: number, quantity: number, order_id: string, product_id: string; }> {
        // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await client.connect();

            const result = await conn.query(ordersql, [add.order_id])

            const order = result.rows[0];

            if (order.status !== "active") {
                throw new Error(`Could not add product ${add.product_id} to order ${add.order_id} because order status is ${order.status}`)
            }

            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }

        try {
            const sql = 'INSERT INTO order_products (user_id, quantity, order_id, product_id) VALUES($1, $2, $3, $4) RETURNING *'
            //@ts-ignore
            const conn = await client.connect()

            const result = await conn
                .query(sql, [add.user_id, add.quantity, add.order_id, add.product_id])

            const order = result.rows[0]

            conn.release()

            return order;
        } catch (err) {
            throw new Error(`Could not add product ${add.product_id} to order ${add.order_id}: ${err}`)
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const sql = 'DELETE FROM order_products WHERE id=($1)';
            const sql2 = 'DELETE FROM orders WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const result2 = await conn.query(sql2, [id]);

            const Order = result.rows[0];

            conn.release();
            return Order;

        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
