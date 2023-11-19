import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import SellerEntity from '../../entities/seller.entity';
import { ISellerRepository } from '../../repositories/seller.repository';

export class GetManySellerUseCase implements IBaseUseCase<SellerEntity[]> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(
    filter: Partial<SellerEntity>,
    pagination: PaginationModel,
    relation: FindOptionsRelations<SellerEntity>,
  ): Promise<SellerEntity[]> {
    return this.sellerRepository.findMany(filter, pagination, relation);
  }
}
