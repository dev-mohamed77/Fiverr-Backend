import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { EndPoint } from '../../application/config/enum/endpoint';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller(`${EndPoint.id}/reviews-user`)
export class ReviewsGigController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getReviewsByUserIdController(
    @Req() req,
    @Query('id') userId: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    if (req.user.id === userId) {
      const [result, length] = await this.reviewService.getManyReviewsService({
        filter: {
          user: {
            id: userId,
          },
        },
        pagination: {
          limit: parseInt(limit),
          page: parseInt(page),
        },
        relation: {
          user: true,
          gig: true,
        },
        select: {
          user: {
            id: true,
            name: true,
            email: true,
            country: true,
          },
          gig: {
            id: true,
            title: true,
            coverImage: true,
          },
        },
      });

      return {
        status: true,
        length,
        result,
      };
    } else {
      throw new BadRequestException('You are not allowed');
    }
  }
}
