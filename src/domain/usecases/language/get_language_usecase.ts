import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ISellerRepository } from '../../repositories/seller.repository';
import SellerEntity from '../../entities/seller.entity';

export class GetSellersUseCase
  implements IBaseUseCase<[SellerEntity[], number]>
{
  constructor(private sellerRepository: ISellerRepository) {}

  execute(
    pagination: PaginationModel,
    relation?: FindOptionsRelations<SellerEntity>,
  ): Promise<[SellerEntity[], number]> {
    return this.sellerRepository.findAll(pagination, relation);
  }
}
