import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/verifyauthtoken';


const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try{
   const products = await store.index();
    res.json(products);
} catch (err) {
 res.status(400);  
 res.json(err);
  }
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.body.id);
    res.json(product)
}

const create = async (_req: Request, res: Response) => {
    try {
        const product: Product = {
            name: _req.body.name,
            price:_req.body.price,
        };
        const newProduct = await store.create(product);
        res.json(newProduct)
        console.log(newProduct)
    } catch(err) {
        console.log(err)
        res.status(400);
        res.json(err);
    }
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const product_routes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
    app.delete('/products', verifyAuthToken, destroy);
};

export default product_routes;