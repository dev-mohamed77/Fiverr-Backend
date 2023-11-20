import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EndPoint } from 'src/application/config/enum/endpoint';

@Controller(`${EndPoint.id}conversation-seller`)
export class ConversationSellerController {
  constructor(private conversationService: ConversationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getConversationBySellerIdController(
    @Param('id', ParseUUIDPipe) sellerId: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] =
      await this.conversationService.getManyConversationsService({
        filter: {
          seller: {
            id: sellerId,
          },
        },
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
}
