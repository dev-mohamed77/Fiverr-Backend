import { IBaseUseCase } from 'src/application/core/base/base_usecase';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repositories/order.repository';

export class GetManyOrdersUseCase
  implements IBaseUseCase<[OrderEntity[], number]>
{
  constructor(private orderRepository: IOrderRepository) {}

  execute(option: FindAllOptionBase): Promise<[OrderEntity[], number]> {
    return this.orderRepository.findMany(option);
  }
}
