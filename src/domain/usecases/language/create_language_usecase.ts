import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';

export class CreateLanguageUseCase implements IBaseUseCase<LanguageEntity> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(params: LanguageEntity): Promise<LanguageEntity> {
    return this.languageRepository.create(params);
  }
}
