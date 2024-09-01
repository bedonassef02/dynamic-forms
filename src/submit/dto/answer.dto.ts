import { IsString, IsUUID } from 'class-validator';

export class AnswerDto {
  @IsUUID()
  id: string;
  @IsString({ each: true })
  answer: string;
}
