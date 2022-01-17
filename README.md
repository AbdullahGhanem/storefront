# Storefront Backend Project Overview
-This is the storefront backend API project. The objective is to build a storefront API using node.js, typescript and express. 

-A database is created and connected to the Node API. PostgreSQL is used to design a relational database with tables including products, users, and ordres 

## Project Instructions 

1. Install dependencies from the package.json 
```
npm install

```

2. Run the migrations to create the database 

```
db-migrate up

```
## Setup Database

- CREATE USER postgres WITH PASSWORD  '' 
- CREATE DATABASE storefront & CREATE DATABASE storefront_test
- Grant storefront & storefront_test to postgres

## ENVIRONMENT VARIABLES:
```
copy .env.example .env
```
If you are using Linux, you can type cp, instead of copy

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Start the storefront API 

```
npm run watch
```

## Test 

```
npm run test
```

## Ports the backend and database are running on 

- Port 3000 for express backend server
- Start the server on port http://127.0.0.1:3000
- The database port will run on Port: 5432 using Postgres. 


## Technologies
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing



