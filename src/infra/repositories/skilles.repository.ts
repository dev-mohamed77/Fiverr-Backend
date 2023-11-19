import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillsEntity } from '../../domain/entities/skills.entity';
import { Skills } from '../models/skills.moadel';
import { ISkillsRepository } from '../../domain/repositories/skilles.repository';

export class SkillsRepositoryImp
  extends BaseTypeOrmDataSource<SkillsEntity>
  implements ISkillsRepository
{
  constructor(@InjectRepository(Skills) repository: Repository<SkillsEntity>) {
    super(repository);
  }
}
