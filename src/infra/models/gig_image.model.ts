import { Column, Entity, ManyToOne } from 'typeorm';
import { GigImageEntity } from '../../domain/entities/gig_image.entity';
import { Gig } from './gig.model';
import { BaseModel } from './base.model';

@Entity()
export class GigImage extends BaseModel implements GigImageEntity {
  @Column('varchar')
  src: string;

  @ManyToOne(() => Gig, { onDelete: 'CASCADE' })
  gig: Gig;
}
