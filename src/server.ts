import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import product_routes from './handlers/products'
import userRoutes from './handlers/user'
import orderRoutes from './handlers/orders'



const app: express.Application = express()
const address: string = "127.0.0.1:3000"

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.json())

app.get('/', function (_req: Request, res: Response) {
    res.send('Hello World!')
})


product_routes(app);
userRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;