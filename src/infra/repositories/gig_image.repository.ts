import { BaseTypeOrmDataSource } from '../../application/core/base/base_typeorm_data_source';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GigImageEntity } from '../../domain/entities/gig_image.entity';
import { IGigImageRepository } from '../../domain/repositories/gig_image.repository';
import { GigImage } from '../models/gig_image.model';

export class GigImageRepositoryImp
  extends BaseTypeOrmDataSource<GigImageEntity>
  implements IGigImageRepository
{
  constructor(
    @InjectRepository(GigImage) repository: Repository<GigImageEntity>,
  ) {
    super(repository);
  }
}
