import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseEntity from '../../application/core/base/base_entity';

@Entity()
export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
