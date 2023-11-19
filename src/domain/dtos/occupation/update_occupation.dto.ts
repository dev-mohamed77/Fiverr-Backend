import { PartialType } from '@nestjs/mapped-types';
import { CreateOccupationDto } from './create_occupation.dto';

export class UpdateOccupationDto extends PartialType(CreateOccupationDto) {}
