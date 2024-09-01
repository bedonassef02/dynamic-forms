import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FormService } from './form.service';
import { FormDto } from './dto/form.dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post()
  create(@Body() formDto: FormDto) {
    return this.formService.create(formDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formService.remove(+id);
  }
}
