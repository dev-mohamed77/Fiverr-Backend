import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import {
  FindOneByIdOptionBase,
  FindOneOptionBase,
} from 'src/application/core/model/option_base_model';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repositories/order.repository';

export class GetOneOrderUseCase implements IBaseUseCase<OrderEntity> {
  constructor(private orderRepository: IOrderRepository) {}

  execute(option: FindOneOptionBase<OrderEntity>): Promise<OrderEntity> {
    return this.orderRepository.findOne(option);
  }
}
