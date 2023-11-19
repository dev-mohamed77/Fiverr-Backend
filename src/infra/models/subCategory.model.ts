import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SubCategoryEntity } from '../../domain/entities/subCategory.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { Category } from './category.model';
import { UserEntity } from '../../domain/entities/user.entity';
import { User } from './user.model';
import { BaseModel } from './base.model';

@Entity()
export class SubCategory extends BaseModel implements SubCategoryEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => Category, { onDelete: 'CASCADE' })
  category: CategoryEntity;
}
