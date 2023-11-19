import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import { updateOptionBase } from 'src/application/core/model/option_base_model';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repositories/order.repository';

export class UpdateOrderUseCase implements IBaseUseCase<OrderEntity> {
  constructor(private orderRepository: IOrderRepository) {}

  execute(option: updateOptionBase<OrderEntity>): Promise<OrderEntity> {
    return this.orderRepository.update(option);
  }
}
