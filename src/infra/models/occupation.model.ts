import { Column, Entity, ManyToOne } from 'typeorm';
import { OccupationEntity } from '../../domain/entities/occupation.entity';
import { OccupationEnum } from '../../application/config/enum/ocupation';
import { Seller } from './seller.model';
import { BaseModel } from './base.model';
import SellerEntity from 'src/domain/entities/seller.entity';

@Entity()
export class Occupation extends BaseModel implements OccupationEntity {
  @Column({ type: 'enum', enum: OccupationEnum })
  occupation: OccupationEnum;

  @Column({ type: 'varchar', length: 100 })
  specialization: string;

  @ManyToOne(() => Seller, { onDelete: 'CASCADE' })
  seller: SellerEntity;

  @Column({ type: 'timestamp' })
  from: Date;

  @Column({ type: 'timestamp' })
  to: Date;
}
