import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';

export class UserRepositoryImp
  extends BaseTypeOrmDataSource<UserEntity>
  implements IUserRepository
{
  constructor(@InjectRepository(User) repository: Repository<UserEntity>) {
    super(repository);
  }
}
