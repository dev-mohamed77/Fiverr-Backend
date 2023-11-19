import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';

export class GetOneLanguageUseCase implements IBaseUseCase<LanguageEntity> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(
    filter: Partial<LanguageEntity>,
    relation?: FindOptionsRelations<LanguageEntity>,
  ): Promise<LanguageEntity> {
    return this.languageRepository.findOne(filter, relation);
  }
}
