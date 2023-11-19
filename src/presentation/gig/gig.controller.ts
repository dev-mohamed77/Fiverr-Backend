import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GigService } from './gig.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GigEntity } from '../../domain/entities/gig.entity';
import { CreateGigDto } from '../../domain/dtos/gig/create_gig.dto';
import { GigImageEntity } from '../../domain/entities/gig_image.entity';
import { Role } from '../../application/config/enum/roles';
import { Roles } from '../auth/role.decorator';
import { RoleGuard } from '../auth/role.guard';
import { EndPoint } from '../../application/config/enum/endpoint';
import { UpdateGigDto } from '../../domain/dtos/gig/update_gig.dto';
import { GigImagesService } from '../gig-images/gig-images.service';
import { CloudinaryService } from '../../application/common/cloudinary/cloudinary.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Like } from 'typeorm';

@Controller(EndPoint.gigPrefix)
export class GigController {
  constructor(
    private gigService: GigService,
    private cloudinaryService: CloudinaryService,
    private gigImageService: GigImagesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'coverImage', maxCount: 1 },
    ]),
  )
  async createGigController(
    @Req() req,
    @UploadedFiles()
    files: {
      images: Array<Express.Multer.File>;
      coverImage: Express.Multer.File;
    },
    @Body() createGigDto: CreateGigDto,
  ) {
    if (!files.images || !files.coverImage) {
      throw new BadRequestException('images and coverImage are required');
    }

    if (!req.user.isSeller) {
      throw new BadRequestException('You are not a seller');
    }

    let coverImageUrl: string;

    if (files.coverImage) {
      const cloudImage = await this.cloudinaryService.uploadImage(
        files.coverImage[0],
        'gigs',
      );

      coverImageUrl = cloudImage.url;
    }

    const gig = new GigEntity({
      title: createGigDto.title,
      description: createGigDto.description,
      price: parseInt(createGigDto.price),
      seller: {
        id: req.user.seller.id,
      },
      category: {
        id: createGigDto.category,
      },
      subCategories: {
        id: createGigDto.subCategory,
      },
      coverImage: coverImageUrl,
      deliveryTime: parseInt(createGigDto.deliveryTime),
    });
    const result = await this.gigService.createGigService(gig);

    for (const image of files.images) {
      const cloudImage = await this.cloudinaryService.uploadImage(
        image,
        'gigs',
      );

      const gigImage = new GigImageEntity({
        src: cloudImage.url,
        gig: {
          id: result.id,
        },
      });
      await this.gigImageService.createGigImageService(gigImage);
    }

    return {
      status: true,
      result,
    };
  }

  @Get()
  @Roles(Role.user, Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getGigsController(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
    @Query('categoryId') categoryId: string,
  ) {
    const title = search || '';

    const [result, length] = await this.gigService.getGigsService({
      pagination: {
        limit: parseInt(limit),
        page: parseInt(page),
      },
      relation: {
        seller: true,
        images: true,
        subCategories: true,
        category: true,
      },
      select: {
        seller: {
          id: true,
          displayName: true,
          picture: true,
        },
        images: {
          id: true,
          src: true,
        },
        category: {
          id: true,
          name: true,
          src: true,
        },
        subCategories: {
          id: true,
          name: true,
        },
      },
      filter: {
        title: Like(`%${title}%`),
        category: {
          id: categoryId,
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
  async getGigByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.gigService.getGigByIdService({
      id,
      relation: {
        seller: true,
        images: true,
        subCategories: true,
        category: true,
      },
      select: {
        seller: {
          id: true,
          displayName: true,
          picture: true,
        },
        images: {
          id: true,
          src: true,
        },
        category: {
          id: true,
          name: true,
          src: true,
        },
        subCategories: {
          id: true,
          name: true,
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
  @UseInterceptors(FilesInterceptor('coverImage', 1))
  async updateGigController(
    @Req() req,
    @Param('id') id: string,
    @Body() updateGigDto: UpdateGigDto,
    @UploadedFiles() coverImage?: Express.Multer.File,
  ) {
    const isGig = await this.gigService.getGigByIdService({
      id,
      relation: {
        seller: true,
        images: true,
      },
      select: {
        seller: {
          id: true,
          fullName: true,
        },
        images: {
          id: true,
          src: true,
        },
      },
    });

    if (req.user.seller.id !== isGig.seller.id) {
      throw new BadRequestException(
        'You cannot update the gig because you are not authorized to do so',
      );
    }

    try {
      const result = await this.updateGig(isGig.id, coverImage, updateGigDto);

      return {
        status: true,
        result,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          result: err.message,
        },
        err.http_code || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async deleteGigController(@Req() req, @Param('id') id: string) {
    const isSeller = await this.gigService.getGigByIdService({
      id,
      relation: {
        seller: true,
      },
      select: {
        seller: {
          id: true,
          fullName: true,
        },
      },
    });

    if (req.user.seller.id !== isSeller.seller.id) {
      throw new BadRequestException(
        'You cannot delete the gig because you are not authorized to do so',
      );
    }

    await this.gigService.deleteGigService(id);

    return {
      status: true,
      result: 'Gig deleted successfully',
    };
  }

  //  ---------------------------- Admin  API -------------------------------

  @Put(`${EndPoint.id}/admin`)
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'coverImage', maxCount: 1 },
    ]),
  )
  async updateGigByAdminController(
    @Param('id') id: string,
    @UploadedFiles()
    files: {
      images: Array<Express.Multer.File>;
      coverImage: Express.Multer.File;
    },
    @Body() updateGigDto: UpdateGigDto,
  ) {
    const result = await this.updateGig(id, files.coverImage, updateGigDto);

    return {
      status: true,
      result,
    };
  }

  @Delete(`${EndPoint.id}/admin`)
  @Roles(Role.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async deleteGigByAdminController(@Param('id') id: string) {
    await this.gigService.deleteGigService(id);

    return {
      status: true,
      result: 'Gig deleted successfully',
    };
  }

  private async updateGig(
    id: string,
    coverImage?: Express.Multer.File,
    updateGigDto?: UpdateGigDto,
  ): Promise<GigEntity> {
    let coverImageUrl: string;
    if (coverImage) {
      const cloud = await this.cloudinaryService.uploadImage(
        coverImage[0],
        'gigs',
      );

      coverImageUrl = cloud.url;
    }

    const result = await this.gigService.updateGigService({
      id,
      params: {
        title: updateGigDto.title,
        price: updateGigDto.price ? parseInt(updateGigDto.price) : undefined,
        description: updateGigDto.description,
        category: updateGigDto.category
          ? {
              id: updateGigDto.category,
            }
          : undefined,
        subCategories: updateGigDto.subCategory
          ? {
              id: updateGigDto.subCategory,
            }
          : undefined,
        coverImage: coverImageUrl ? coverImageUrl : undefined,
        deliveryTime: updateGigDto.deliveryTime
          ? parseInt(updateGigDto.deliveryTime)
          : undefined,
        updatedAt: new Date(Date.now()),
      },
      relation: {
        seller: true,
        images: true,
        subCategories: true,
        category: true,
      },
      select: {
        seller: {
          id: true,
          displayName: true,
          picture: true,
        },
        images: {
          id: true,
          src: true,
        },
        category: {
          id: true,
          name: true,
          src: true,
        },
        subCategories: {
          id: true,
          name: true,
        },
      },
    });

    return result;
  }
}
