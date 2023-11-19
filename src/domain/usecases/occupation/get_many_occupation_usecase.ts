import { IBaseUseCase } from '../../../application/core/base/base_usecase';
import { PaginationModel } from '../../../application/core/model/pagination_model';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { LanguageEntity } from '../../entities/language.entity';
import { ILanguageRepository } from '../../repositories/language.repository';

export class GetManyLanguageUseCase implements IBaseUseCase<LanguageEntity[]> {
  constructor(private languageRepository: ILanguageRepository) {}

  execute(
    filter: Partial<LanguageEntity>,
    pagination: PaginationModel,
    relation: FindOptionsRelations<LanguageEntity>,
  ): Promise<LanguageEntity[]> {
    return this.languageRepository.findMany(filter, pagination, relation);
  }
}
