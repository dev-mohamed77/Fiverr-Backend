import BaseEntity from 'src/application/core/base/base_entity';
import SellerEntity from './seller.entity';
import { UserEntity } from './user.entity';
import { GigEntity } from './gig.entity';
import { Payment } from 'src/application/config/enum/payment';
import { OrderStatus } from 'src/application/config/enum/order_status';

export class OrderEntity extends BaseEntity {
  seller?: SellerEntity; // many to one
  user?: UserEntity; // many to one
  gig?: GigEntity; // many to one
  description: string;
  payment: Payment;
  statusSeller?: OrderStatus;
  statusUser?: OrderStatus;
  serviceFee?: number;
  subTotal?: number;
  total?: number;
  deliveryTime?: number;

  constructor(partial: Partial<OrderEntity>) {
    super();
    Object.assign(this, partial);
  }
}
