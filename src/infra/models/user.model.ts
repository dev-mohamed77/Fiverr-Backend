import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { Gender } from '../../application/config/enum/gender';

@Entity()
export class User extends UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
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
    nullable: true,
  })
  gender: Gender;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  phone: string;

  @Column({ type: 'int', length: 3, nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'boolean', default: false })
  isSeller: boolean;

  @OneToOne(type => )
  seller:

  @Column({ type: 'datetime', default: Date.now() })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
