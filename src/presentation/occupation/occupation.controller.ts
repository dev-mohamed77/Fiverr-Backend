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
import { OccupationService } from './occupation.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { EndPoint } from '../../application/config/enum/endpoint';
import { OccupationEntity } from '../../domain/entities/occupation.entity';
import { CreateOccupationDto } from '../../domain/dtos/occupation/create_occupation.dto';
import { UpdateOccupationDto } from '../../domain/dtos/occupation/update_occupation.dto';

@Controller(EndPoint.occupationPrefix)
export class OccupationController {
  constructor(private occupationService: OccupationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOccupation(@Body() createOccupationDto: CreateOccupationDto) {
    const occupation = new OccupationEntity({
      specialization: createOccupationDto.specialization,
      occupation: createOccupationDto.occupation,
      from: createOccupationDto.from,
      to: createOccupationDto.to,
      seller: {
        id: createOccupationDto.seller,
      },
    });
    const result = await this.occupationService.createOccupationService(
      occupation,
    );

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(EndPoint.id)
  async getOccupationByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.occupationService.getOccupationByIdService({
      id,
      relation: {
        seller: true,
      },
    });

    if (!result) {
      throw new BadRequestException(`Occupation ${id} is not exist`);
    }

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOccupationsController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.occupationService.getOccupationsService(
      {
        pagination: {
          limit: parseInt(limit),
          page: parseInt(page),
        },
        relation: { seller: true },
        select: {
          seller: {
            id: true,
            fullName: true,
          },
        },
      },
    );

    return {
      status: true,
      length: length,
      result: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(EndPoint.id)
  async updateOccupationByIdController(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOccupationDto: UpdateOccupationDto,
  ) {
    const occupationExsit =
      await this.occupationService.getOccupationByIdService({
        id: id,
        relation: {
          seller: true,
        },
        select: {
          seller: {
            id: true,
          },
        },
      });

    if (!req.user.isSeller) {
      throw new BadRequestException(
        'You cannot modify this occupation, as you are not a seller',
      );
    }

    if (occupationExsit.seller.id !== req.user.seller.id) {
      throw new BadRequestException('You cannot modify this occupation');
    }

    const occupation = new OccupationEntity({
      specialization: updateOccupationDto.specialization,
      occupation: updateOccupationDto.occupation,
      from: updateOccupationDto.from,
      to: updateOccupationDto.to,
    });

    const result = await this.occupationService.updateOccupationService({
      id,
      params: occupation,
      relation: { seller: true },
      select: {
        seller: {
          id: true,
          fullName: true,
        },
      },
    });

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(EndPoint.id)
  async deleteOccupationByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.occupationService.deleteOccupationService(id);

    if (!result) {
      throw new BadRequestException(`seller ${id} is not exist`);
    }

    return {
      status: true,
      result: 'Occupation deleted successfully',
    };
  }
}
