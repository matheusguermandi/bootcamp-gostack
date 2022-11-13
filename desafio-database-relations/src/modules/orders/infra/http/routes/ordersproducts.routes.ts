import { Router } from 'express';

import OrdersProductsController from '../controller/OrdersProductsController';

const ordersproductsRouter = Router();
const ordersProductsController = new OrdersProductsController();

ordersproductsRouter.get('/', ordersProductsController.index);
ordersproductsRouter.get('/:id', ordersProductsController.show);

export default ordersproductsRouter;
