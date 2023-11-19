import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import SellerEntity from '../../domain/entities/seller.entity';
import { ISellerRepository } from '../../domain/repositories/seller.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from '../models/seller.model';
import { Repository } from 'typeorm';

export class SellerRepositoryImp
  extends BaseTypeOrmDataSource<SellerEntity>
  implements ISellerRepository
{
  constructor(@InjectRepository(Seller) repository: Repository<SellerEntity>) {
    super(repository);
  }
}
