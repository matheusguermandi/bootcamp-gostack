import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListOrdersProductsService from '@modules/orders/services/ListOrdersProductsService';
import FindOrdersProductsService from '@modules/orders/services/FindOrdersProductsService';

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrdersProducts = container.resolve(ListOrdersProductsService);

    const ordersProducts = await listOrdersProducts.execute();

    return response.json(ordersProducts);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrdersProducts = container.resolve(FindOrdersProductsService);

    const ordersProducts = await findOrdersProducts.execute({ id });

    return response.json(ordersProducts);
  }
}
