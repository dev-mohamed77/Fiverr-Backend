import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { CreateOrderDto } from 'src/domain/dtos/order/create_order.dto';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { OrderStatus } from 'src/application/config/enum/order_status';
import { UpdateOrderDto } from 'src/domain/dtos/order/update_order.dto';
import { SellerService } from '../seller/seller.service';

@Controller('orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
    private sellerService: SellerService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrderController(
    @Req() req,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const order = new OrderEntity({
      user: {
        id: req.user.id,
      },
      seller: {
        id: createOrderDto.seller,
      },
      gig: {
        id: createOrderDto.gig,
      },
      payment: createOrderDto.payment,
      description: createOrderDto.description,
      deliveryTime: createOrderDto.deliveryTime,
      serviceFee: createOrderDto.serviceFee,
      subTotal: createOrderDto.subTotal,
      total: createOrderDto.subTotal + createOrderDto.serviceFee,
    });

    const result = await this.orderService.createOrderService(order);

    return {
      status: true,
      result: result,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders(@Query('limit') limit: string, @Query('page') page: string) {
    const [result, length] = await this.orderService.getOrdersService({
      pagination: {
        limit: limit ? parseInt(limit) : undefined,
        page: limit ? parseInt(page) : undefined,
      },
      relation: {
        gig: true,
        seller: true,
        user: true,
      },
      select: {
        gig: {
          id: true,
          title: true,
          coverImage: true,
          price: true,
          deliveryTime: true,
        },
        seller: {
          id: true,
          fullName: true,
          displayName: true,
          picture: true,
        },
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return {
      status: true,
      length,
      result,
    };
  }

  @Get(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async getOrderByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.orderService.getOrderByIdService({
      id: id,
      relation: {
        gig: true,
        seller: true,
        user: true,
      },
      select: {
        gig: {
          id: true,
          title: true,
          coverImage: true,
          price: true,
          deliveryTime: true,
        },
        seller: {
          id: true,
          fullName: true,
          displayName: true,
          picture: true,
        },
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async updateOrderByIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const result = await this.orderService.updateOrderService({
      id: id,
      params: {
        statusSeller: updateOrderDto.statusSeller,
        statusUser: updateOrderDto.statusUser,
      },
      relation: {
        gig: true,
        seller: true,
        user: true,
      },
      select: {
        gig: {
          id: true,
          title: true,
          coverImage: true,
          price: true,
          deliveryTime: true,
        },
        seller: {
          id: true,
          fullName: true,
          displayName: true,
          picture: true,
        },
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (
      result.statusSeller == OrderStatus.complete &&
      result.statusUser == OrderStatus.complete
    ) {
      await this.sellerService.updateSellerService({
        id: result.seller.id,
        params: {
          balance: result.subTotal,
        },
      });
    }

    return {
      status: true,
      result,
    };
  }

  @Delete(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async deleteOrderByIdController(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const order = await this.orderService.getOrderByIdService({
      id: id,
      relation: {
        seller: true,
        user: true,
      },
      select: {
        seller: {
          id: true,
        },
        user: {
          id: true,
        },
      },
    });

    if (
      order.user.id !== req.user.id &&
      order.seller.id !== req.user.seller.id
    ) {
      throw new BadRequestException(
        'You cannot delete the order because you are not authorized to do so',
      );
    }

    await this.orderService.deleteOneOrderService({
      id: id,
    });

    return {
      status: true,
      result: 'Order deleted successfully',
    };
  }
}
