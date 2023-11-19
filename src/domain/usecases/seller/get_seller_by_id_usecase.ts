import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import SellerEntity from '../../entities/seller.entity';
import { ISellerRepository } from '../../repositories/seller.repository';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';

export class GetSellerByIdUseCase implements IBaseUseCase<SellerEntity> {
  constructor(private sellerRepository: ISellerRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<SellerEntity> {
    return this.sellerRepository.findById(option);
  }
}
