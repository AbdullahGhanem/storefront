import supertest from 'supertest';
import app from '../server';

//endpoint testing
const request = supertest(app);

describe('Test end point http://127.0.0.1:3000/ responses', () => {
    it('The api endpoint was opend with status 200', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});
