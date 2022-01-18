import { User, UserStore } from '../../models/user';

const store = new UserStore();

const users = [
    {
        username: 'Admin',
    },
    {
        username: 'abdullah',
    },
];

describe('User Model', () => {
    const user: User = {
        username: users[1].username,
        password: '123456789',
    };

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a user', async () => {
        const result = await store.create(user);
        expect(result).toBeTruthy;
    });

    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        const u = jasmine.objectContaining(users[1]);
        expect(result).toContain(u);
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('show method should return the correct user', async () => {
        const result = await store.show("4");
        const u = jasmine.objectContaining(users[1]);
        expect(result).toEqual(u);
    });

    it('should have a authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    it('authenticate method must confirm that a user exists', async () => {
        const result = await store.authenticate(user.username, user.password);
        expect(result).not.toBeNull;
    });
});
