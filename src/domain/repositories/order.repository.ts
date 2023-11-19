import IBaseRepository from 'src/application/core/base/base_repository';
import { OrderEntity } from '../entities/order.entity';

export abstract class IOrderRepository extends IBaseRepository<OrderEntity> {}
