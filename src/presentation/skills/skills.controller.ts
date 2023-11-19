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
import { EndPoint } from '../../application/config/enum/endpoint';
import { SkillsService } from './skills.service';
import { SkillsEntity } from '../../domain/entities/skills.entity';
import { CreateSkillDto } from '../../domain/dtos/skills/create_skill.dto';
import { UpdateSkillDto } from '../../domain/dtos/skills/update_skill.dto';

@Controller(EndPoint.skillsPrefix)
export class SkillsController {
  constructor(private skillsService: SkillsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async creatSkill(@Body() createSkillsDto: CreateSkillDto) {
    const skills = new SkillsEntity({
      skill: createSkillsDto.skill,
      level: createSkillsDto.level,
      seller: {
        id: createSkillsDto.seller,
      },
    });
    const result = await this.skillsService.createSkillsService(skills);

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(EndPoint.id)
  async getSkillByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.skillsService.getSkillsByIdService({
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

    if (!result) {
      throw new BadRequestException(`Skill ${id} is not exist`);
    }

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSkillsController(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const [result, length] = await this.skillsService.getSkillsService({
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
    });

    return {
      status: true,
      length: length,
      result: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put(EndPoint.id)
  async updateSkillByIdController(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    const skill = await this.skillsService.getSkillsByIdService({
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
        'You cannot modify this skill, as you are not a seller',
      );
    }

    if (skill.seller.id !== req.user.seller.id) {
      throw new BadRequestException('You cannot modify this skill');
    }

    const skills = new SkillsEntity({
      skill: updateSkillDto.skill,
      level: updateSkillDto.level,
      updatedAt: new Date(Date.now()),
    });

    const result = await this.skillsService.updateSkillsService({
      id,
      params: skills,
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

    return {
      status: true,
      result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(EndPoint.id)
  async deleteSkillByIdController(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.skillsService.deleteSkillsService(id);

    if (!result) {
      throw new BadRequestException(`skill ${id} is not exist`);
    }

    return {
      status: true,
      result: 'Skill deleted successfully',
    };
  }
}
