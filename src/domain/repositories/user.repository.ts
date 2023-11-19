import IBaseRepository from '../../application/core/base/base_repository';
import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository extends IBaseRepository<UserEntity> {}
