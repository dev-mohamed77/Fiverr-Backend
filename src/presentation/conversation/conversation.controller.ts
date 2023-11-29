import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { CreateConversationDto } from 'src/domain/dtos/conversation/create_conversation.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from 'src/application/config/enum/roles';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { GetConversationByUserIdAndSellerIdDto } from 'src/domain/dtos/conversation/get_conversation_by_seller_id_and_user_id.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private conversationService: ConversationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createConversationController(
    @Req() req,
    @Body() createConversationDto: CreateConversationDto,
  ) {
    const conversation = new ConversationEntity({
      user: {
        id: req.user.id,
      },
      seller: {
        id: createConversationDto.seller,
      },
    });

    const result = await this.conversationService.createConversationService(
      conversation,
    );

    return {
      status: true,
      result,
    };
  }

  @Get()
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getConversationsController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] =
      await this.conversationService.getConversationsService({
        pagination: {
          limit: parseInt(limit),
          page: parseInt(page),
        },
        relation: {
          seller: true,
          user: true,
        },
        select: {
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

  @Get('seller-user')
  @UseGuards(JwtAuthGuard)
  async getConversationByUserIdAndSellerIdController(
    @Body() conversation: GetConversationByUserIdAndSellerIdDto,
  ) {
    const result = await this.conversationService.getOneConversationService(
      {
        params: {
          seller: {
            id: conversation.seller,
          },
          user: {
            id: conversation.user,
          },
        },

        relation: {
          seller: true,
          user: true,
        },
        select: {
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
      },
      { isUseThrow: false },
    );

    return {
      status: true,
      result,
    };
  }

  @Get(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async getConversationByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.conversationService.getConversationByIdService({
      id: id,
      relation: {
        seller: true,
        user: true,
      },
      select: {
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

  @Delete(EndPoint.id)
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async deleteConversationByIdController(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.conversationService.deleteConversationService(id);

    return {
      status: true,
      result: 'Conversation deleted successfully',
    };
  }
}
