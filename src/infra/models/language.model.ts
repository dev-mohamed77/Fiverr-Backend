import { LanguageEntity } from '../../domain/entities/language.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { LanguageLevel } from '../../application/config/enum/language_level';
import { Seller } from './seller.model';
import { BaseModel } from './base.model';
import SellerEntity from 'src/domain/entities/seller.entity';

@Entity()
export class Language extends BaseModel implements LanguageEntity {
  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'enum', enum: LanguageLevel })
  level: LanguageLevel;

  @ManyToOne(() => Seller, { onDelete: 'CASCADE' })
  seller: SellerEntity;
}
