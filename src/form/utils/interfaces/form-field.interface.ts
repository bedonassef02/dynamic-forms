import { FieldType } from '../types/field.type';

export interface FormField {
  id: string;
  title: string;
  image?: string;
  options: string[];
  type: FieldType;
  multipleChoice: boolean;
  required: boolean;
}
