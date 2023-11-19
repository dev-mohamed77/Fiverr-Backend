import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';
import { FindAllOptionBase } from 'src/application/core/model/option_base_model';

export class GetManyLanguagesUseCase
  implements IBaseUseCase<[LanguageEntity[], number]>
{
  constructor(private languageRepository: ILanguageRepository) {}

  execute(option: FindAllOptionBase): Promise<[LanguageEntity[], number]> {
    return this.languageRepository.findMany(option);
  }
}
