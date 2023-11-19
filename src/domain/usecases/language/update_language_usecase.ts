import { updateOptionBase } from 'src/application/core/model/option_base_model';
import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';

export class UpdateLanguageUseCase implements IBaseUseCase<LanguageEntity> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(option: updateOptionBase<LanguageEntity>): Promise<LanguageEntity> {
    return this.languageRepository.update(option);
  }
}
