import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SubmitDto } from './dto/submit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Submit } from './entities/submit.entity';
import { Model } from 'mongoose';
import { FormService } from '../form/form.service';
import { validateAnswers } from '../form/utils/helpers/validate-answers';

@Injectable()
export class SubmitService {
  constructor(
    @InjectModel(Submit.name) private readonly submitModel: Model<Submit>,
    private readonly formService: FormService,
  ) {}

  async create(submitDto: SubmitDto) {
    await this.validate(submitDto);
    return this.submitModel.create(submitDto);
  }

  findAll(form: string) {
    return this.submitModel.find({ form });
  }

  private async validate(submitDto: SubmitDto) {
    const form = await this.isFormExist(submitDto.form);
    validateAnswers(form.fields, submitDto.answers);
  }

  private async isFormExist(id: string) {
    const form = await this.formService.findOne(id);
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    if (form.validTo < new Date()) {
      throw new BadRequestException('Form Ended');
    }
    return form;
  }
}
