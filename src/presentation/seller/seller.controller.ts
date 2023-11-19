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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { EndPoint } from '../../application/config/enum/endpoint';
import { CreateSellerDto } from '../../domain/dtos/seller/create_seller.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import SellerEntity from '../../domain/entities/seller.entity';
import { UpdateSellerDto } from '../../domain/dtos/seller/update_seller.dto';
import { CreateSellerLoggedUserDto } from '../../domain/dtos/seller/create_seller_logged_user.dto';
import { UserService } from '../user/user.service';
import { LanguageEntity } from '../../domain/entities/language.entity';
import { OccupationEntity } from '../../domain/entities/occupation.entity';
import { SkillsEntity } from '../../domain/entities/skills.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserEntity } from '../../domain/entities/user.entity';
import { CloudinaryService } from '../../application/common/cloudinary/cloudinary.service';

@Controller(EndPoint.sellerPrefix)
export class SellerController {
  constructor(
    private sellerService: SellerService,
    private userService: UserService,
    private cloudianryService: CloudinaryService,
  ) {}

  // ---------------------------------- Logged User -------------------------------
  @Post(EndPoint.createSellerLoggedUser)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async createSellerLoggedUserController(
    @Req() req,
    @UploadedFile() image: Express.Multer.File,
    @Body() createSellerLoggedUserDto: CreateSellerLoggedUserDto,
  ) {
    if (!image) {
      throw new BadRequestException('images is required');
    }

    const imageUrl = await this.cloudianryService.uploadImage(image, 'seller');

    const seller = new SellerEntity({
      fullName: createSellerLoggedUserDto.fullName,
      displayName: createSellerLoggedUserDto.displayName,
      picture: imageUrl.url,
      description: createSellerLoggedUserDto.description,
      user: req.user,
      website: createSellerLoggedUserDto.website,
    });

    const result = await this.sellerService.createSellerService(seller);

    const updateUser = new UserEntity({
      isSeller: true,
      updatedAt: new Date(Date.now()),
    });

    await this.userService.updateUserService({
      id: req.user.id,
      params: updateUser,
    });

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(EndPoint.getSellerByIdLoggedUser)
  async getSellerByIdLoggedUserController(@Req() req) {
    const result = await this.sellerService.getOneSellerService({
      params: {
        user: {
          id: req.user.id,
        },
      },
      relation: {
        user: true,
        language: true,
        occupation: true,
        skills: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
        language: {
          id: true,
          language: true,
          level: true,
        },
        occupation: {
          id: true,
          occupation: true,
          specialization: true,
          from: true,
          to: true,
        },
        skills: {
          id: true,
          skill: true,
          level: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(
        `seller ${req.user.seller.id} is not exist`,
      );
    }

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.updateSellerByIdLoggedUser)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateSellerByIdLoggedUserController(
    @Req() req,
    @Body() updateSellerDto: UpdateSellerDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    let imageUrl: string;
    if (image) {
      const cloud = await this.cloudianryService.uploadImage(image, 'gigs');

      imageUrl = cloud.url;
    }

    const sellerEntity = new SellerEntity({
      fullName: updateSellerDto.fullName,
      displayName: updateSellerDto.displayName,
      picture: imageUrl ? imageUrl : undefined,
      description: updateSellerDto.description,
      website: updateSellerDto.website,
    });

    const result = await this.sellerService.updateSellerService({
      id: req.user.seller.id,
      params: sellerEntity,
      relation: {
        user: true,
        language: true,
        occupation: true,
        skills: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
        language: {
          id: true,
          language: true,
          level: true,
        },
        occupation: {
          id: true,
          occupation: true,
          specialization: true,
          from: true,
          to: true,
        },
        skills: {
          id: true,
          skill: true,
          level: true,
        },
      },
    });

    return {
      status: true,
      result,
    };
  }

  // ------------------------------------- Admin -----------------------------------

  // @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createSellerController(@Body() createSellerDto: CreateSellerDto) {
    const user = await this.userService.getUserByIdService({
      id: createSellerDto.user,
    });

    if (!user) {
      throw new BadRequestException(
        `This user id ${createSellerDto.user} is not exist`,
      );
    }

    const isUserSellerExist = await this.sellerService.getOneSellerService({
      params: {
        user: {
          id: createSellerDto.user,
        },
      },
    });

    if (!isUserSellerExist) {
      throw new BadRequestException('This user is already a seller');
    }

    const seller = new SellerEntity({
      fullName: createSellerDto.fullName,
      displayName: createSellerDto.displayName,
      picture: createSellerDto.picture,
      description: createSellerDto.description,
      user: user,
      website: createSellerDto.website,
    });
    const result = await this.sellerService.createSellerService(seller);

    const updateUser = new UserEntity({
      isSeller: true,
      updatedAt: new Date(Date.now()),
    });

    await this.userService.updateUserService({
      id: user.id,
      params: updateUser,
    });

    return {
      status: true,
      result,
    };
  }

  @Get()
  async getSellersController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.sellerService.getSellersService({
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
      },
      relation: {
        user: true,
        language: true,
        occupation: true,
        skills: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
        language: {
          id: true,
          language: true,
          level: true,
        },
        occupation: {
          id: true,
          occupation: true,
          specialization: true,
          from: true,
          to: true,
        },
        skills: {
          id: true,
          skill: true,
          level: true,
        },
      },
    });

    return {
      status: true,
      length,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(EndPoint.id)
  async getSellerByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.sellerService.getSellerByIdService({
      id,
      relation: {
        user: true,
        language: true,
        occupation: true,
        skills: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
        language: {
          id: true,
          language: true,
          level: true,
        },
        occupation: {
          id: true,
          occupation: true,
          specialization: true,
          from: true,
          to: true,
        },
        skills: {
          id: true,
          skill: true,
          level: true,
        },
      },
    });

    if (!result) {
      throw new BadRequestException(`seller ${id} is not exist`);
    }

    return {
      status: true,
      result,
    };
  }

  @Put(EndPoint.id)
  @UseGuards(JwtAuthGuard)
  async updateSellerByIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    const seller: SellerEntity = await this.sellerService.getSellerByIdService({
      id,
    });

    if (!seller) {
      throw new BadRequestException(`seller ${id} is not exist`);
    }

    const skills: SkillsEntity[] = updateSellerDto.skills.map((sk) => {
      const skill = new SkillsEntity({
        id: sk.toString(),
      });

      return skill;
    });

    const sellerEntity = new SellerEntity({
      fullName: updateSellerDto.fullName,
      displayName: updateSellerDto.displayName,
      picture: updateSellerDto.picture,
      description: updateSellerDto.description,
      user: updateSellerDto.user,
      language: updateSellerDto.language,
      occupation: updateSellerDto.occupation,
      skills: skills,
      website: updateSellerDto.website,
    });

    const result = await this.sellerService.updateSellerService({
      id: seller.id,
      params: sellerEntity,
      relation: {
        user: true,
        language: true,
        occupation: true,
        skills: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
        language: {
          id: true,
          language: true,
          level: true,
        },
        occupation: {
          id: true,
          occupation: true,
          specialization: true,
          from: true,
          to: true,
        },
        skills: {
          id: true,
          skill: true,
          level: true,
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
  async deleteSellerController(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.sellerService.getOneSellerService({
      params: {
        id: id,
        user: {
          id: req.user.id,
        },
      },
    });

    await this.sellerService.deleteSellerService(id);

    return {
      status: true,
      result: 'seller deleted successfully',
    };
  }
}
