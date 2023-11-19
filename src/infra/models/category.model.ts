import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { SubCategoryEntity } from '../../domain/entities/subCategory.entity';
import { SubCategory } from './subCategory.model';
import { UserEntity } from '../../domain/entities/user.entity';
import { User } from './user.model';
import { GigEntity } from '../../domain/entities/gig.entity';
import { Gig } from './gig.model';
import { BaseModel } from './base.model';

@Entity()
export class Category extends BaseModel implements CategoryEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  src: string;

  @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  @JoinColumn()
  subCategories: SubCategoryEntity[];

  @OneToMany(() => Gig, (gig) => gig.category)
  gig: GigEntity[];
}
