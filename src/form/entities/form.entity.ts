import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { FormField } from '../utils/interfaces/form-field.interface';

@Schema({ timestamps: true })
export class Form extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  fields: FormField[];

  @Prop()
  validFrom: Date;

  @Prop()
  validTo: Date;
}

export type FormDocument = HydratedDocument<Form>;

export const FormSchema = SchemaFactory.createForClass(Form);
