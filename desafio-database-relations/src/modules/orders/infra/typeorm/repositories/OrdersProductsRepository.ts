import { getRepository, Repository } from 'typeorm';

import IOrdersProductsRepository from '../../../repositories/IOrdersProductsRepository';

import OrdersProducts from '../entities/OrdersProducts';

class OrdersProductsRepository implements IOrdersProductsRepository {
  private ormRepository: Repository<OrdersProducts>;

  constructor() {
    this.ormRepository = getRepository(OrdersProducts);
  }

  public async findAll(): Promise<OrdersProducts[] | undefined> {
    const findOrdersProducts = await this.ormRepository.find();

    return findOrdersProducts;
  }

  public async findById(id: string): Promise<OrdersProducts | undefined> {
    const findByIdOrdersProducts = await this.ormRepository.findOne(id);

    return findByIdOrdersProducts;
  }
}

export default OrdersProductsRepository;
