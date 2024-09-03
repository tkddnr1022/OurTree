import { CounterModule } from './../counter/counter.module';
import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from './schemas/board.schema';

@Module({
  imports: [CounterModule, MongooseModule.forFeature([{ name: 'board', schema: BoardSchema }])],
  providers: [BoardService],
  controllers: [BoardController]
})
export class BoardModule {}
