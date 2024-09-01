import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { Answer } from '../utils/answer.interface';

@Schema({ timestamps: true })
export class Submit extends Document {
  @Prop({ required: true })
  form: string;

  @Prop()
  answers: Answer[];
}

export type SubmitDocument = HydratedDocument<Submit>;

export const SubmitSchema = SchemaFactory.createForClass(Submit);
