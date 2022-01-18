import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

const users = [
    {
        username: 'Admin',
        password: 'admin_password',
    },
    {
        username: 'Elko',
        password: 'elko_password',
    },
];

describe('User Test Endpoints', () => {
    let token: string;

    it('api create should opend with status 200', async () => {
        const response = await request.post('/users').send(users[0]);
        expect(response.status).toBe(200);
        token = response.body;
    });

    it('api login should opend with status 200', async () => {
        const response = await request
            .post('/users/login')
            .send(users[0])
            .set('Accepted', 'json');
        token = 'Bearer ' + response.body;
        expect(response.status).toBe(200);
    });

    it('api index should opend with status 200', async () => {
        const response = await request.get('/users').set('Authorization', token);
        expect(response.status).toBe(200);
    });

    it('api index should opend with status 401 because invalid token', async () => {
        const token1 =
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const response = await request.get('/users').set('Authorization', token1);
        expect(response.status).toBe(401);
    });

    it('api show should opend with status 200', async () => {
        const response = await request.get('/users/1').set('Authorization', token);
        expect(response.status).toBe(200);
    });
});
