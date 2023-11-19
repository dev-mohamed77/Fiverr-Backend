import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repositories/order.repository';

export class DeleteOneOrderUseCase implements IBaseUseCase<boolean> {
  constructor(private orderRepository: IOrderRepository) {}

  execute(filter: Partial<OrderEntity>): Promise<boolean> {
    return this.orderRepository.deleteOne(filter);
  }
}
