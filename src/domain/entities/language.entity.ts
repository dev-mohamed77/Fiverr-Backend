import BaseEntity from '../../application/core/base/base_entity';
import { LanguageLevel } from '../../application/config/enum/language_level';
import SellerEntity from './seller.entity';

export class LanguageEntity extends BaseEntity {
  language: string;
  level: LanguageLevel;
  seller: SellerEntity; // many to one

  constructor(partial: Partial<LanguageEntity>) {
    super();
    Object.assign(this, partial);
  }
}
