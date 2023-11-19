import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { ReviewEntity } from '../../domain/entities/review.entity';
import { GigEntity } from '../../domain/entities/gig.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { IsInt, Max, Min } from 'class-validator';
import { Gig } from './gig.model';
import { User } from './user.model';

@Entity()
export class Review extends BaseModel implements ReviewEntity {
  @Column({ type: 'text' })
  description: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @Column('int')
  star: number;

  @ManyToOne(() => Gig, { onDelete: 'CASCADE' })
  gig: GigEntity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: UserEntity;
}
