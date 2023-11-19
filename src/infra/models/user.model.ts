import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { Gender } from '../../application/config/enum/gender';
import { Seller } from './seller.model';
import SellerEntity from '../../domain/entities/seller.entity';
import { Role } from '../../application/config/enum/roles';
import { SubCategory } from './subCategory.model';
import { SubCategoryEntity } from '../../domain/entities/subCategory.entity';
import { CategoryEntity } from '../../domain/entities/category.entity';
import { Category } from './category.model';
import { BaseModel } from './base.model';

@Entity()
export class User extends BaseModel implements UserEntity {
  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Male,
  })
  gender: Gender;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  phone: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country: string;

  @Column({ type: 'boolean', default: false })
  isSeller: boolean;

  @OneToOne(() => Seller, (seller) => seller.user)
  @JoinColumn()
  seller: SellerEntity;

  @OneToMany(() => Category, (category) => category.user)
  categories: CategoryEntity[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.user)
  subCategories: SubCategoryEntity[];

  @Column({ type: 'enum', enum: Role, default: Role.user })
  roles: Role;

  @Column({ type: 'timestamp', nullable: true })
  passwordChangedAt: Date;

  @Column({ type: 'varchar', nullable: true })
  passwordResetCode: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date;

  @Column({ type: 'boolean', nullable: true })
  passwordResetVerified: boolean;
}
