import IBaseRepository from '../../application/core/base/base_repository';
import SellerEntity from '../entities/seller.entity';

export abstract class ISellerRepository extends IBaseRepository<SellerEntity> {}
