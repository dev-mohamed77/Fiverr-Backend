import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import SellerEntity from '../../entities/seller.entity';
import { ISellerRepository } from '../../repositories/seller.repository';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetManySellerUseCase
  implements IBaseUseCase<[SellerEntity[], number]>
{
  constructor(private sellerRepository: ISellerRepository) {}

  execute(option: FindAllOptionBase): Promise<[SellerEntity[], number]> {
    return this.sellerRepository.findMany(option);
  }
}
