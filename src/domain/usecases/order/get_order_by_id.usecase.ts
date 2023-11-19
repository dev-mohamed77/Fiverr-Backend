import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repositories/order.repository';

export class GetOrderByIdUseCase implements IBaseUseCase<OrderEntity> {
  constructor(private orderRepository: IOrderRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<OrderEntity> {
    return this.orderRepository.findById(option);
  }
}
