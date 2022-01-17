CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL, 
    quantity integer NOT NULL,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);