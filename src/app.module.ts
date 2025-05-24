import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { ContactModule } from './contact/contact.module';
import * as dotenv from 'dotenv';
dotenv.config()

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({ ttl: 60, limit: 40 }),
    MongooseModule.forRoot(String(process.env.MONGODB_URL).trim()),
    EventEmitterModule.forRoot(),
    BlogModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
