import IBaseRepository from '../../application/core/base/base_repository';
import { GigEntity } from '../entities/gig.entity';

export abstract class IGigRepository extends IBaseRepository<GigEntity> {}
