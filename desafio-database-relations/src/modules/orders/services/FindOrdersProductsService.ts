import { inject, injectable } from 'tsyringe';

import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';
import IOrdersProductsRepository from '../repositories/IOrdersProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class FindOrdersProductsService {
  constructor(
    @inject('OrdersProductsRepository')
    private ordersProductsRepository: IOrdersProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<OrdersProducts | undefined> {
    const ordersproducts = await this.ordersProductsRepository.findById(id);

    return ordersproducts;
  }
}

export default FindOrdersProductsService;
