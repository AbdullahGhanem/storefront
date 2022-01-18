import supertest from 'supertest';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Client from '../../database';

dotenv.config();

const request = supertest(app);
const userStore = new UserStore();

let token = ' ';

describe('Orders Test Endpoints', () => {
    beforeAll(async () => {
        const boss: User = {
            username: 'abdullah',
            password: '123456789',
        };
        const newBoss = await userStore.create(boss);
        if (process.env.TOKEN_SECRET) {
            token = jwt.sign({ user: newBoss }, process.env.TOKEN_SECRET);
        }

        const conn = await Client.connect();
        const sql =
            'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
        const result = await conn.query(sql, [newBoss.id, 'active']);
        const order = result.rows[0];
        conn.release();
        return order;
    });

    it('api show should opend with status 200', async () => {
        token = 'Bearer ' + token;
        const response = await request.get('/orders/1').set('Authorization', token);
        expect(response.status).toBe(200);
    });
});
