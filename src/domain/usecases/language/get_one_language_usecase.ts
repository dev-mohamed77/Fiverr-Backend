import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';
import { FindOneOptionBase } from 'src/application/core/model/option_base_model';

export class GetOneLanguageUseCase implements IBaseUseCase<LanguageEntity> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(option: FindOneOptionBase<LanguageEntity>): Promise<LanguageEntity> {
    return this.languageRepository.findOne(option);
  }
}
