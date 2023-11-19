import { CreateLanguageDto } from './create_language.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {}
