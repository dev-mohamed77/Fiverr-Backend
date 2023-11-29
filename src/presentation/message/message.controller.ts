import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ConversationEntity } from 'src/domain/entities/conversation.entity';
import { CreateConversationDto } from 'src/domain/dtos/conversation/create_conversation.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from 'src/application/config/enum/roles';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { MessageService } from './message.service';
import { Sender } from 'src/application/config/enum/sender';
import { DeleteMessageDto } from 'src/domain/dtos/message/delete_message.dto';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMessagesController(
    @Query('limit')
    limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] = await this.messageService.getMessagesService({
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
      relation: {
        conversation: true,
        seller: true,
        user: true,
      },
      select: {
        conversation: {
          id: true,
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

  @Get(`${EndPoint.id}/conversation`)
  @UseGuards(JwtAuthGuard)
  async getMessagesByConversationIdController(
    @Param('id', ParseUUIDPipe) conversationId: string,
    @Query('limit')
    limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] = await this.messageService.getManyMessagesService({
      filter: {
        conversation: {
          id: conversationId,
        },
      },
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
      relation: {
        conversation: true,
        seller: true,
        user: true,
      },
      select: {
        conversation: {
          id: true,
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
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      status: true,
      length,
      result,
    };
  }

  @Delete(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async deleteMessageByIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() deleteMessageDto: DeleteMessageDto,
  ) {
    const message = await this.messageService.getMessageByIdService({
      id: id,
      relation: {
        conversation: true,
        seller: true,
        user: true,
      },
      select: {
        conversation: {
          id: true,
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
      message.sender != deleteMessageDto.sender ||
      message.conversation.id != deleteMessageDto.conversation ||
      message.seller.id != deleteMessageDto.seller ||
      message.user.id != deleteMessageDto.user
    ) {
      throw new BadRequestException(
        'You are not allowed to delete this message',
      );
    }

    await this.messageService.deleteMessageService(id);

    return {
      status: true,
      message: 'Message deleted successfully',
    };
  }
}
