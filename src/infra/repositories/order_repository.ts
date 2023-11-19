import { InjectRepository } from '@nestjs/typeorm';
import { BaseTypeOrmDataSource } from 'src/application/core/base/base_typeorm_data_source';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repositories/order.repository';
import { Order } from '../models/order.model';
import { Repository } from 'typeorm';

export class OrderRepositoryImp
  extends BaseTypeOrmDataSource<OrderEntity>
  implements IOrderRepository
{
  constructor(@InjectRepository(Order) repository: Repository<OrderEntity>) {
    super(repository);
  }
}
