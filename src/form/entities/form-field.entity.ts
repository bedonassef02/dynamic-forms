import { HydratedDocument } from 'mongoose';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class FormField {
  title: string;
  image: string;
  choices: string[];
}

export type FormFieldDocument = HydratedDocument<FormField>;
export const FormFieldSchema = SchemaFactory.createForClass(FormField);
