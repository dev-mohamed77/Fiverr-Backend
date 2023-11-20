import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller(`conversation-user`)
export class ConversationUserController {
  constructor(private conversationService: ConversationService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getConversationByUserIdController(
    @Req() req,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] =
      await this.conversationService.getManyConversationsService({
        filter: {
          user: {
            id: req.user.id,
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
