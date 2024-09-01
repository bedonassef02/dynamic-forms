import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnswerDto } from './answer.dto';
import { Answer } from '../utils/answer.interface';

export class SubmitDto {
  @IsMongoId()
  form: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: Answer[];
}
