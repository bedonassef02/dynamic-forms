import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { FieldType } from '../utils/types/field.type';
import { IsValidType } from '../utils/decorators/is-valid-type.decorator';
import { v4 } from 'uuid';

export class FormFieldDto {
  @IsOptional()
  id = v4();

  @IsNumber()
  @IsInt()
  @Min(1)
  order: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  options: string[];

  @IsOptional()
  @IsString()
  @IsValidType()
  @IsIn(Object.values(FieldType))
  type: FieldType = FieldType.MCQ;

  @IsOptional()
  @IsBoolean()
  multipleChoice: boolean = false;

  @IsOptional()
  @IsBoolean()
  required: boolean = false;
}
