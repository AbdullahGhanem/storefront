import { UserStore } from '../user';

const store = new UserStore();

describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    })
    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('create method should add a user', async () => {
        const user = await store.create({
            username: 'abdullahghanem',
            password: '123456789'

        });
        expect(user.username).toMatch('abdullahghanem');
    });

    it('authenticate the user', async () => {
        const authenticateUser = await store.authenticate('abdullahghanem', '123456789');
        expect(authenticateUser).toBeTruthy
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result).toContain(jasmine.objectContaining({
            id: 1,
            username: 'abdullahghanem'
        }));
    });


    it('show method should return the correct user', async () => {
        const result = await store.show('1');
        expect(result).toEqual(jasmine.objectContaining({
            id: 1,
            username: 'abdullahghanem'
        }));

    });
});


