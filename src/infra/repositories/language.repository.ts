import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { ILanguageRepository } from '../../domain/repositories/language.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../models/language.model';
import { LanguageEntity } from '../../domain/entities/language.entity';

export class LanguageRepositoryImp
  extends BaseTypeOrmDataSource<LanguageEntity>
  implements ILanguageRepository
{
  constructor(
    @InjectRepository(Language) repository: Repository<LanguageEntity>,
  ) {
    super(repository);
  }
}
