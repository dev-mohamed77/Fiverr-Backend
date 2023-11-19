import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { EndPoint } from '../../application/config/enum/endpoint';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { FindOptionsOrderValue } from 'typeorm';

@Controller(`${EndPoint.id}/reviews-gig`)
export class ReviewsGigController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  async getReviewsByGigIdController(
    @Param('id') gigId: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
    @Query('sort') sort: string,
  ) {
    const [result, length] = await this.reviewService.getManyReviewsService({
      filter: {
        gig: {
          id: gigId,
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
      order: {
        star: sort ? (sort as FindOptionsOrderValue) : undefined,
        createdAt: 'DESC',
      },
    });

    return {
      status: true,
      length,
      result,
    };
  }
}
