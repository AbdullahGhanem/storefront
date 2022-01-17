import app from '../../server';
import supertest from 'supertest'


const request = supertest(app);

describe('Test endpoint responses', () => {
    it('check if server responds 200 status', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });

    it('testing product endpoint for valid product', async done => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        done();
    });


    it('testing users id endpoint', async done => {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
        done();
    });

    describe('POST /products', function () {
        it('responds with json', function (done) {
            supertest(app)
                .post('/products')
                .send({
                    name: 'john',
                    price: 1
                })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done();
                    return done();
                });
        });
    });
});

describe('GET /users', function () {
    it('responds with json', function (done) {
        supertest(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(401, done);
    });
});

// Authentication Test For Users

describe('GET /users', function () {
    it('responds with json', function (done) {
        supertest(app)
            .get('/users')
            .auth('username', 'password_digest')
            .set('Accept', 'application/json')
            .expect(401, done);
    });
});

describe('POST /users', function () {
    it('responds with json', function (done) {
        supertest(app)
            .post('/users')
            .send({ name: 'john' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done();
                return done();
            });
    });

    // Orders Test

    describe('POST /orders', function () {
        it('responds with json', function (done) {
            supertest(app)
                .post('/orders')
                .send({
                    user_id: 'john',
                    status: 'active'
                })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done();
                    return done();
                });
        });
    });

});




