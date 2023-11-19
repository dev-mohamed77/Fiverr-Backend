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
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateReviewDto } from 'src/domain/dtos/review/create-review.dto';
import { ReviewService } from './review.service';
import { ReviewEntity } from 'src/domain/entities/review.entity';
import { EndPoint } from 'src/application/config/enum/endpoint';
import { UpdateReviewDto } from 'src/domain/dtos/review/update-review.dto';
import { GigService } from '../gig/gig.service';

@Controller('reviews')
export class ReviewController {
  constructor(
    private reviewService: ReviewService,
    private gigService: GigService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createReviewController(
    @Req() req,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const gig = await this.gigService.getGigByIdService({
      id: createReviewDto.gig,
      relation: {
        reviews: true,
      },
      select: {
        reviews: {
          id: true,
          star: true,
          description: true,
        },
      },
    });

    const review = new ReviewEntity({
      user: {
        id: req.user.id,
      },
      gig: {
        id: gig.id,
      },
      star: createReviewDto.star,
      description: createReviewDto.description,
    });
    const result = await this.reviewService.createReviewService(review);

    const totalRatings = gig.reviews.length;

    const sum = gig.reviews.reduce(
      (acc, review) => acc + review.star,
      result.star,
    );

    const averageRating = sum / totalRatings;

    await this.gigService.updateGigService({
      id: gig.id,
      params: {
        averageRating: averageRating,
      },
    });

    return {
      status: true,
      result,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getReviewsController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] = await this.reviewService.getReviewsService({
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
  }

  @Get(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async getReviewByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.reviewService.getReviewByIdService({
      id,
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
      result,
    };
  }

  @Put(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async updateReviewController(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const review = await this.reviewService.getReviewByIdService({
      id,
      relation: {
        user: true,
      },
      select: {
        user: {
          id: true,
        },
      },
    });

    if (req.user.id === review.user.id) {
      const result = await this.reviewService.updateReviewService({
        id,
        params: {
          description: updateReviewDto.description,
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
        result,
      };
    } else {
      throw new BadRequestException('You are not allowed to update the review');
    }
  }

  @Delete(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async deleteReviewController(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const review = await this.reviewService.getReviewByIdService({
      id,
      relation: {
        user: true,
      },
      select: {
        user: {
          id: true,
        },
      },
    });

    if (req.user.id === review.user.id) {
      await this.reviewService.deleteReviewService(id);

      return {
        status: true,
        result: 'Review deleted successfully',
      };
    } else {
      throw new BadRequestException('You are not allowed to delete the review');
    }
  }
}
