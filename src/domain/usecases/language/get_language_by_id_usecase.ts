import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';
import { FindOneByIdOptionBase } from 'src/application/core/model/option_base_model';

export class GetLanguageByIdUseCase implements IBaseUseCase<LanguageEntity> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(option: FindOneByIdOptionBase): Promise<LanguageEntity> {
    return this.languageRepository.findById(option);
  }
}
