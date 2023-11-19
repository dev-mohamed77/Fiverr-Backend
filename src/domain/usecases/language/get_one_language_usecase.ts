import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import SellerEntity from '../../entities/seller.entity';
import { ISellerRepository } from '../../repositories/seller.repository';

export class GetOneSellerUseCase implements IBaseUseCase<SellerEntity> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(
    filter: Partial<SellerEntity>,
    relation?: FindOptionsRelations<SellerEntity>,
  ): Promise<SellerEntity> {
    return this.sellerRepository.findOne(filter, relation);
  }
}
