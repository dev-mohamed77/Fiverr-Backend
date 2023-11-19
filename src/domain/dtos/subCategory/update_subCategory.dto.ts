import { PartialType } from '@nestjs/mapped-types';
import { CreateSubCategoryDto } from './create_subCategory.dto';

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}
