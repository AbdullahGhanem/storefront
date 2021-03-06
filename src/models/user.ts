import bcrypt from 'bcrypt'
import client from '../database'

const pepper = process.env.BCRYPT_PASSWORD || '';
const saltRounds = process.env.SALT_ROUNDS || '';


export type User = {
    id?: number;
    username: string;
    password: string;
};

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id])
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users (username, password_digest) VALUES ($1, $2) RETURNING *';

            const hash = bcrypt.hashSync(
                u.password + pepper,
                parseInt(saltRounds)
            );

            const result = await conn.query(sql, [u.username, hash])
            const user = result.rows[0];

            conn.release();

            return user;
        } catch (err) {
            throw new Error(`unable to create user (${u.username}): ${err}`)
        }

    }

    async delete(id: number): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await client.connect()
        const sql = 'SELECT password_digest FROM users WHERE username=($1)';
        const result = await conn.query(sql, [username])

        if (result.rows.length) {
            const user = result.rows[0]
            if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                return user
            }
        }
        return null;
    }

}
