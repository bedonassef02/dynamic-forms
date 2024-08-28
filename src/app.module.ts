import { Module } from '@nestjs/common';
import { FormModule } from './form/form.module';
import { MongoDbModule } from './mongo-db/mongo-db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    MongoDbModule,
    FormModule,
  ],
})
export class AppModule {}
