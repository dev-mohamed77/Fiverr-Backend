import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import SellerEntity from '../../entities/seller.entity';
import { ISellerRepository } from '../../repositories/seller.repository';

export class GetSellerByIdUseCase implements IBaseUseCase<SellerEntity> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(
    id: string,
    relation?: FindOptionsRelations<SellerEntity>,
  ): Promise<SellerEntity> {
    return this.sellerRepository.findById(id, relation);
  }
}
