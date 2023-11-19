import { Column, Entity, ManyToOne } from 'typeorm';
import { SkillsEntity } from '../../domain/entities/skills.entity';
import { SkillLevel } from '../../application/config/enum/skill_level';
import { Seller } from './seller.model';
import { BaseModel } from './base.model';
import SellerEntity from 'src/domain/entities/seller.entity';

@Entity()
export class Skills extends BaseModel implements SkillsEntity {
  @Column({ type: 'varchar', length: 50 })
  skill: string;

  @Column({ type: 'enum', enum: SkillLevel })
  level: SkillLevel;

  @ManyToOne(() => Seller, (seller) => seller.skills, { onDelete: 'CASCADE' })
  seller: SellerEntity;
}
