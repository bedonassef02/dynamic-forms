import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Form extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  fields: string[];

  @Prop()
  validFrom: Date;

  @Prop()
  validTo: Date;
}

export type FormDocument = HydratedDocument<Form>;

export const FormSchema = SchemaFactory.createForClass(Form);
