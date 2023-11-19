import SellerEntity from '../../domain/entities/seller.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Language } from './language.model';
import { LanguageEntity } from '../../domain/entities/language.entity';
import { OccupationEntity } from '../../domain/entities/occupation.entity';
import { Occupation } from './occupation.model';
import { Skills } from './skills.moadel';
import { SkillsEntity } from '../../domain/entities/skills.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { User } from './user.model';
import { Gig } from './gig.model';
import { GigEntity } from '../../domain/entities/gig.entity';
import { BaseModel } from './base.model';

@Entity()
export class Seller extends BaseModel implements SellerEntity {
  @Column({ type: 'varchar', length: 50 })
  fullName: string;

  @Column({ type: 'varchar', length: 50 })
  displayName: string;

  @Column({ type: 'varchar' })
  picture: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', default: 0 })
  balance: number;

  @OneToOne(() => User, (user) => user.seller, { onDelete: 'CASCADE' })
  user: UserEntity;

  @OneToMany(() => Gig, (gig) => gig.seller)
  gig: GigEntity[];

  @OneToMany(() => Language, (language) => language.seller)
  language: LanguageEntity[];

  @OneToMany(() => Occupation, (occupation) => occupation.seller)
  occupation: OccupationEntity[];

  @OneToMany(() => Skills, (skills) => skills.seller)
  skills: SkillsEntity[];

  @Column({ type: 'varchar', length: 255 })
  website: string;
}
