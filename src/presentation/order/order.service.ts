import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FindAllOptionTypOrmModel,
  FindOneByIDOptionTypeOrmModel,
  FindOneOptionTypeOrmModel,
  UpdateOptionTypeOrmModel,
} from 'src/application/core/model/options_typeorm_model';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { CreateOrderUseCase } from 'src/domain/usecases/order/create_order.usecase';
import { DeleteOneOrderUseCase } from 'src/domain/usecases/order/delete_one_order.usecase';
import { DeleteOrderUseCase } from 'src/domain/usecases/order/delete_order.usecase';
import { GetManyOrdersUseCase } from 'src/domain/usecases/order/get_many_orders_usecase';
import { GetOneOrderUseCase } from 'src/domain/usecases/order/get_one_order.usecase';
import { GetOrderByIdUseCase } from 'src/domain/usecases/order/get_order_by_id.usecase';
import { GetOrdersUseCase } from 'src/domain/usecases/order/get_orders.usecase';
import { UpdateOrderUseCase } from 'src/domain/usecases/order/update_order.usecase';

@Injectable()
export class OrderService {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getOrdersUseCase: GetOrdersUseCase,
    private getManyOrdersUseCase: GetManyOrdersUseCase,
    private getOrderByIdUseCase: GetOrderByIdUseCase,
    private getOneOrderUseCase: GetOneOrderUseCase,
    private updateOrderUseCase: UpdateOrderUseCase,
    private deleteOrderUseCase: DeleteOrderUseCase,
    private deleteOneOrderUseCase: DeleteOneOrderUseCase,
  ) {}

  createOrderService(params: OrderEntity) {
    return this.createOrderUseCase.execute(params);
  }

  getOrdersService(option: FindAllOptionTypOrmModel<OrderEntity>) {
    return this.getOrdersUseCase.execute(option);
  }

  getManyOrdersService(option: FindAllOptionTypOrmModel<OrderEntity>) {
    return this.getManyOrdersUseCase.execute(option);
  }

  async getOrderByIdService(
    option: FindOneByIDOptionTypeOrmModel<OrderEntity>,
  ) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.getOrderByIdUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Order ${option.id} is not exist`);
    }

    return result;
  }

  async getOneOrderService(option: FindOneOptionTypeOrmModel<OrderEntity>) {
    const result = await this.getOneOrderUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Order is not exist`);
    }

    return result;
  }

  async updateOrderService(option: UpdateOptionTypeOrmModel<OrderEntity>) {
    if (!option.id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.updateOrderUseCase.execute(option);

    if (!result) {
      throw new BadRequestException(`Order ${option.id} is not exist`);
    }

    return result;
  }

  async deleteOrderService(id: string) {
    if (!id) {
      throw new BadRequestException(`id is required`);
    }
    const result = await this.deleteOrderUseCase.execute(id);
    if (!result) {
      throw new BadRequestException(`Order ${id} is not exist`);
    }

    return result;
  }

  async deleteOneOrderService(filter: Partial<OrderEntity>) {
    const result = await this.deleteOneOrderUseCase.execute(filter);

    if (!result) {
      throw new BadRequestException(`Order is not exist`);
    }

    return result;
  }
}
