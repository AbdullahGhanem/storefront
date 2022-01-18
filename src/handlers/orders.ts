import express, { Request, Response } from 'express'
import verifyAuthToken from '../middleware/verifyauthtoken';
import { addProduct, Order, OrderStore } from '../models/order'


const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const orders = await store.show(_req.params.id)
        res.json(orders)
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        user_id: req.body.user_id,
        status: "active",
    }
    try {
        const newOrder = await store.create(order);
        res.json(newOrder);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const addProduct = async (_req: Request, res: Response) => {
    const add: addProduct = {
        user_id: _req.body.user_id,
        order_id: _req.params.id,
        product_id: _req.body.product_id,
        quantity: _req.body.quantity,
    };

    try {
        const addedProduct = await store.addProduct(add)
        res.json(addedProduct)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:id', verifyAuthToken, show)
    app.post('/orders', verifyAuthToken, create)
    app.delete('/orders', verifyAuthToken, destroy);
    // add product
    app.post('/orders/:id/products', addProduct)
}

export default orderRoutes