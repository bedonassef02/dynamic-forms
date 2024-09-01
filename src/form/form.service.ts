import { Injectable } from '@nestjs/common';
import { FormDto } from './dto/form.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Form } from './entities/form.entity';
import { Model } from 'mongoose';

@Injectable()
export class FormService {
  constructor(
    @InjectModel(Form.name) private readonly formModel: Model<Form>,
  ) {}

  create(formDto: FormDto) {
    return this.formModel.create(formDto);
  }

  findOne(id: string) {
    return this.formModel.findById(id);
  }

  remove(id: number) {
    return this.formModel.findByIdAndDelete(id);
  }
}
