import {
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { FormFieldDto } from './form-field.dto';
import { Type } from 'class-transformer';
import { IsValidDate } from '../utils/decorators/is-valid-date.decorator';

export class FormDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsDateString()
  @IsValidDate()
  validFrom?: Date = new Date(new Date().getTime() + 60 * 1000);

  @IsOptional()
  @IsDateString()
  validTo?: Date = new Date(this.validFrom.getTime() + 24 * 60 * 60 * 1000);

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormFieldDto)
  fields: FormFieldDto[];
}
