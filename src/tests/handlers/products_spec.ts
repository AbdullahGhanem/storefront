import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import { Product } from '../../models/product';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const request = supertest(app);
const store = new UserStore();

const products: Product[] = [
    {
        name: 'Pro1',
        price: 10,
    },
    {
        name: 'Pro2',
        price: 20,
    },
];
let token = ' ';
describe('Products Test Endpoints', () => {
    beforeAll(async () => {
        const admin: User = {
            username: 'Ilko',
            password: 'ilko_password',
        };
        const newAdmin = await store.create(admin);
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({ user: newAdmin }, process.env.TOKEN_SECRET);
        }
    });

    it('api create should opend with status 200', async () => {
        token = 'Bearer ' + token;
        const response = await request
            .post('/products')
            .send(products[0])
            .set('Authorization', token);
        expect(response.status).toBe(200);
    });

    it('api index should opend with status 200', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });

    it('api show should opend with status 200', async () => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
    });
});
