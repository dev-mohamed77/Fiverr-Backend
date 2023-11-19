import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  forwardRef,
} from '@nestjs/common';
import { GigImagesService } from './gig-images.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { GigImageEntity } from '../../domain/entities/gig_image.entity';
import { CreateGigImageDto } from '../../domain/dtos/gig-image/create-gig-image.dto';
import { EndPoint } from '../../application/config/enum/endpoint';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../application/common/cloudinary/cloudinary.service';
import { GigService } from '../gig/gig.service';

@Controller('gig-images')
export class GigImagesController {
  constructor(
    private gigImageService: GigImagesService,
    private cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => GigService))
    private gigService: GigService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createImageController(
    @Req() req,
    @Body() createGigImageDto: CreateGigImageDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const isGig = await this.gigService.getGigByIdService({
      id: createGigImageDto.gig,
      relation: {
        seller: true,
      },
      select: {
        seller: {
          id: true,
        },
      },
    });

    if (isGig.seller.id != req.user.seller.id) {
      throw new BadRequestException(
        'You cannot add the image because you are not authorized to do so',
      );
    }

    if (!image) {
      throw new BadRequestException('image is required');
    }

    const uploadImage = await this.cloudinaryService.uploadImage(image, 'gigs');

    const gigImage = new GigImageEntity({
      src: uploadImage.url,
      gig: {
        id: createGigImageDto.gig,
      },
    });

    const result = await this.gigImageService.createGigImageService(gigImage);

    return {
      status: true,
      result,
    };
  }

  @Get(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async getImageByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.gigImageService.getGigImageByIdService({ id });

    return {
      status: true,
      result,
    };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getImagesController(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const [result, length] = await this.gigImageService.getGigImagesService({
      pagination: { page: parseInt(page), limit: parseInt(limit) },
    });

    return {
      status: true,
      length,
      result,
    };
  }

  @Get(`${EndPoint.id}/gig`)
  async getImagesByGigIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    const result = await this.gigImageService.getManyGigImagesService({
      filter: {
        gig: {
          id: id,
        },
      },
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
      relation: {
        gig: true,
      },
      select: {
        gig: {
          id: true,
          title: true,
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
  @UseInterceptors(FileInterceptor('image'))
  async updateImageController(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('image is required');
    }
    const uploadImage = await this.cloudinaryService.uploadImage(image, 'gigs');

    const gigImage = new GigImageEntity({
      src: uploadImage.url,
      updatedAt: new Date(Date.now()),
    });

    const result = await this.gigImageService.updateGigImageService({
      id,
      params: gigImage,
    });

    return {
      status: true,
      result,
    };
  }

  @Delete(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async deleteImageController(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
    @Body() createGigImageDto: CreateGigImageDto,
  ) {
    const isGig = await this.gigService.getGigByIdService({
      id: createGigImageDto.gig,
      relation: {
        seller: true,
      },
      select: {
        seller: {
          id: true,
        },
      },
    });

    if (isGig.seller.id != req.user.seller.id) {
      throw new BadRequestException(
        'You cannot add the image because you are not authorized to do so',
      );
    }

    await this.gigImageService.deleteGigImageService(id);

    return {
      status: true,
      result: 'Image deleted successfully',
    };
  }
}
