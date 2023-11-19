import { Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.model';
import { FavoriteEntity } from '../../domain/entities/favorite.entity';
import { GigEntity } from '../../domain/entities/gig.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { User } from './user.model';
import { Gig } from './gig.model';

@Entity()
export class Favorite extends BaseModel implements FavoriteEntity {
  @ManyToOne(() => Gig, { onDelete: 'CASCADE' })
  gig: GigEntity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: UserEntity;
}
