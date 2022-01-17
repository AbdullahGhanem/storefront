# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: Get Products (app.get('/products', index) (http://localhost:3000/products)
- Show- (app.get('/products/:id', show)(http://localhost:3000/products/1)
- Create [token required] - app.post('/products', verifyAuthToken, create);
- Delete [ token required] - DELETE products/

#### Users
- Index [token required] 
    GET/users
- Show [token required]
    GET/users/:id
- Create [token required]
    POST users/
- Delete [token required]
    Delete users/

#### Orders
- Current Order by user (args: user id)[token required]-- app.post('/orders/:id/user_id)


## Data Shapes
#### Product
-  id
- name
- price
```
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL
```
#### User
- id
- username
- password_digest

```
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(100) NOT NULL,
    password_digest VARCHAR NOT NULL
```

#### Orders
- id
- status
- user_id

```
    id SERIAL PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id bigint REFERENCES users(id) NOT NULL
```
#### order_products
-id
-user_id
-quantity
-order_id
-product_id

```
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL, 
    quantity integer NOT NULL,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
```