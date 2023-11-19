import { OrderEntity } from 'src/domain/entities/order.entity';
import { BaseModel } from './base.model';
import { GigEntity } from 'src/domain/entities/gig.entity';
import SellerEntity from 'src/domain/entities/seller.entity';
import { UserEntity } from 'src/domain/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Seller } from './seller.model';
import { User } from './user.model';
import { Gig } from './gig.model';
import { Payment } from 'src/application/config/enum/payment';
import { OrderStatus } from 'src/application/config/enum/order_status';

@Entity()
export class Order extends BaseModel implements OrderEntity {
  @ManyToOne(() => Seller, { onDelete: 'CASCADE' })
  @JoinColumn()
  seller: SellerEntity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => Gig, { onDelete: 'CASCADE' })
  @JoinColumn()
  gig: GigEntity;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: Payment })
  payment: Payment;

  @Column({ type: 'int' })
  serviceFee: number;

  @Column({ type: 'int' })
  subTotal: number;

  @Column({ type: 'int' })
  total: number;

  @Column({ type: 'int', default: 0 })
  deliveryTime: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.onProgress,
  })
  statusSeller: OrderStatus;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.onProgress })
  statusUser: OrderStatus;
}
