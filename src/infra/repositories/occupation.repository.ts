import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Occupation } from '../models/occupation.model';
import { OccupationEntity } from '../../domain/entities/occupation.entity';
import { IOccupationRepository } from '../../domain/repositories/occupation.repository';

export class OccupationRepositoryImp
  extends BaseTypeOrmDataSource<OccupationEntity>
  implements IOccupationRepository
{
  constructor(
    @InjectRepository(Occupation) repository: Repository<OccupationEntity>,
  ) {
    super(repository);
  }
}
