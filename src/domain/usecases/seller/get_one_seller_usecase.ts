import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import SellerEntity from '../../entities/seller.entity';
import { ISellerRepository } from '../../repositories/seller.repository';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';

export class GetOneSellerUseCase implements IBaseUseCase<SellerEntity> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(option: FindOneOptionBase<SellerEntity>): Promise<SellerEntity> {
    return this.sellerRepository.findOne(option);
  }
}
