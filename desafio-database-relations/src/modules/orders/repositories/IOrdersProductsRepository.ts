import OrdersProducts from '../infra/typeorm/entities/OrdersProducts';

export default interface IOrdersProductsRepository {
  findAll(): Promise<OrdersProducts[] | undefined>;
  findById(id: string): Promise<OrdersProducts | undefined>;
}
