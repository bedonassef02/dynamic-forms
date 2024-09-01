import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitDto } from './dto/submit.dto';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post()
  create(@Body() submitDto: SubmitDto) {
    return this.submitService.create(submitDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.submitService.findAll(id);
  }
}
