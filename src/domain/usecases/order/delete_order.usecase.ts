import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repositories/order.repository';

export class DeleteOrderUseCase implements IBaseUseCase<boolean> {
  constructor(private orderRepository: IOrderRepository) {}

  execute(id: string): Promise<boolean> {
    return this.orderRepository.delete(id);
  }
}
