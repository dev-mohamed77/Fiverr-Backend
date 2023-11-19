import IBaseRepository from '../../application/core/base/base_repository';
import { GigImageEntity } from '../entities/gig_image.entity';

export abstract class IGigImageRepository extends IBaseRepository<GigImageEntity> {}
