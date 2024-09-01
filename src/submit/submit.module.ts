import { Module } from '@nestjs/common';
import { SubmitService } from './submit.service';
import { SubmitController } from './submit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FormModule } from '../form/form.module';
import { Submit, SubmitSchema } from './entities/submit.entity';

@Module({
  imports: [
    FormModule,
    MongooseModule.forFeature([{ name: Submit.name, schema: SubmitSchema }]),
  ],
  controllers: [SubmitController],
  providers: [SubmitService],
})
export class SubmitModule {}
