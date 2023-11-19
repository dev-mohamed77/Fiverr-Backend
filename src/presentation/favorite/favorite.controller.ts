import {
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
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateFavoriteDto } from '../../domain/dtos/favorite/create-favorite.dto';
import { FavoriteEntity } from '../../domain/entities/favorite.entity';
import { EndPoint } from '../../application/config/enum/endpoint';
import { UpdateFavoriteDto } from '../../domain/dtos/favorite/update-favorite.dto';
import { CreateFavoriteLoggedUserDto } from 'src/domain/dtos/favorite/create_favorite_logged_user';

@Controller('favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  // -------------------------------- Logged User --------------------------------

  @Post('user')
  @UseGuards(JwtAuthGuard)
  async createFavoriteLoggedUserController(
    @Req() req,
    @Body() createFavoriteDto: CreateFavoriteLoggedUserDto,
  ) {
    const favoriteEntity = new FavoriteEntity({
      user: { id: req.user.id },
      gig: { id: createFavoriteDto.gig },
    });

    const result = await this.favoriteService.createFavoriteService(
      favoriteEntity,
    );

    return {
      status: true,
      result,
    };
  }

  @Get(`/user`)
  @UseGuards(JwtAuthGuard)
  async getFavoritesByUserIdLoggedUserController(
    @Req() req,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] = await this.favoriteService.getManyFavoritesService(
      {
        filter: {
          user: { id: req.user.id },
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
          },
          gig: {
            id: true,
            title: true,
            coverImage: true,
            price: true,
          },
        },
      },
    );

    return {
      status: true,
      length,
      result,
    };
  }

  @Delete(`/user`)
  @UseGuards(JwtAuthGuard)
  async deleteFavoriteByUserLoggedController(
    @Req() req,
    @Body('gig', ParseUUIDPipe) gigId: string,
  ) {
    await this.favoriteService.deleteOneFavoriteService({
      user: {
        id: req.user.id,
      },
      gig: {
        id: gigId,
      },
    });

    return {
      status: true,
      result: 'Favorites deleted successfully',
    };
  }

  // -------------------------------- Admin Api --------------------------------

  @Post()
  @UseGuards(JwtAuthGuard)
  async createFavoriteController(@Body() createFavoriteDto: CreateFavoriteDto) {
    const favoriteEntity = new FavoriteEntity({
      user: { id: createFavoriteDto.user },
      gig: { id: createFavoriteDto.gig },
    });

    const result = await this.favoriteService.createFavoriteService(
      favoriteEntity,
    );

    return {
      status: true,
      result,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFavoritesController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const result = await this.favoriteService.getFavoritesService({
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
        },
        gig: {
          id: true,
          title: true,
          coverImage: true,
          price: true,
        },
      },
    });

    return {
      status: true,
      result,
    };
  }

  @Get(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async getFavoriteByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoriteService.getFavoriteByIdService({
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
        },
        gig: {
          id: true,
          title: true,
          coverImage: true,
          price: true,
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
  async updateFavoriteController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    const result = await this.favoriteService.updateFavoriteService({
      id,
      params: {
        user: {
          id: updateFavoriteDto.user,
        },
        gig: {
          id: updateFavoriteDto.gig,
        },
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
        },
        gig: {
          id: true,
          title: true,
          coverImage: true,
          price: true,
        },
      },
    });

    return {
      status: true,
      result,
    };
  }

  @Delete(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async deleteFavoriteController(@Param('id', ParseUUIDPipe) id: string) {
    await this.favoriteService.deleteFavoriteService(id);

    return {
      status: true,
      result: 'Favorites deleted successfully',
    };
  }
}
