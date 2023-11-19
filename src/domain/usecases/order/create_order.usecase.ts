import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repositories/order.repository';

export class CreateOrderUseCase implements IBaseUseCase<OrderEntity> {
  constructor(private orderRepository: IOrderRepository) {}
  execute(params: OrderEntity): Promise<OrderEntity> {
    return this.orderRepository.create(params);
  }
}
