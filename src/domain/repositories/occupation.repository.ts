import IBaseRepository from '../../application/core/base/base_repository';
import { OccupationEntity } from '../entities/occupation.entity';

export abstract class IOccupationRepository extends IBaseRepository<OccupationEntity> {}
