import BaseEntity from '../../application/core/base/base_entity';
import { OccupationEnum } from '../../application/config/enum/ocupation';
import SellerEntity from './seller.entity';
import { Occupation } from '../../infra/models/occupation.model';

export class OccupationEntity extends BaseEntity {
  seller: SellerEntity; // many to one
  occupation: OccupationEnum; // المهنه
  specialization: string; // التخصص
  from: Date;
  to: Date;

  constructor(partial: Partial<Occupation>) {
    super();
    Object.assign(this, partial);
  }
}
