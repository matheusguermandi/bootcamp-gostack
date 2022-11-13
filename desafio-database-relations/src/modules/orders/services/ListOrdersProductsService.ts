import { inject, injectable } from 'tsyringe';

import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';

@injectable()
class ListOrdersProductsService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,
  ) {}

  public async execute(): Promise<OrdersProducts[] | undefined> {
    const ordersProducts = await this.ordersProductsRepository.findAll();

    return ordersProducts;
  }
}

export default ListOrdersProductsService;
