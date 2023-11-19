import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGigRepository } from '../../domain/repositories/gig.repository';
import { GigEntity } from '../../domain/entities/gig.entity';
import { Gig } from '../models/gig.model';

export class GigRepositoryImp
  extends BaseTypeOrmDataSource<GigEntity>
  implements IGigRepository
{
  constructor(@InjectRepository(Gig) repository: Repository<GigEntity>) {
    super(repository);
  }
}
