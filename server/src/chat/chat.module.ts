import { CounterModule } from '../counter/counter.module';
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schemas/chat.schema';

@Module({
  imports: [CounterModule, MongooseModule.forFeature([{ name: 'chat', schema: ChatSchema }])],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
