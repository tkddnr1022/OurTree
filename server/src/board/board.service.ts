import { Injectable } from '@nestjs/common';
import { BoardDocument } from './schemas/board.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetBoardDto } from './dto/get-board.dto';
import { GetResponse } from 'src/interfaces/get-response';
import { CreateBoardDto } from './dto/create-board.dto';
import { CreateResponse } from 'src/interfaces/create-response';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { DeleteBoardDto } from './dto/delete-board.dto';
import { DeleteResponse } from 'src/interfaces/delete-response';
import { CounterService } from 'src/counter/counter.service';

@Injectable()
export class BoardService {
    constructor(
        @InjectModel('board') private readonly boardModel: Model<BoardDocument>,
        private readonly counterService: CounterService
    ) { }

    // DB에 생성
    async create(request: CreateBoardDto): Promise<CreateResponse> {
        try {
            request.id = await this.counterService.getSequenceValue('board');
            const boardInfo = await new this.boardModel(request).save();
            console.log("Database access success");
            return {
                success: true,
                data: boardInfo
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }

    // DB에서 불러오기
    async get(request: GetBoardDto): Promise<GetResponse> {
        try {
            const filter = request.id !== undefined ? { id: request.id } : {};
            const boardInfo = await this.boardModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: boardInfo
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }

    // DB에 업데이트
    async update(request: UpdateBoardDto): Promise<UpdateResponse> {
        try {
            const filter = {
                id: request.id
            };
            const update = { $set: request };
            const boardInfo = await this.boardModel.findOneAndUpdate(filter, update).exec();
            console.log("Database access success");
            return {
                success: true,
                data: boardInfo
            };
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }

    // DB에서 삭제
    async delete(request: DeleteBoardDto): Promise<DeleteResponse> {
        try {
            const filter = {
                id: request.id
            };
            await this.boardModel.deleteOne(filter).exec();
            console.log("Database access success");
            return {
                success: true
            };
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }

    async increaseArticle(id: number): Promise<void> {
        await this.boardModel.findOneAndUpdate(
            { id: id },
            { $inc: { articleCount: 1 } }
        );
    }

    async decreaseArticle(id: number): Promise<void> {
        await this.boardModel.findOneAndUpdate(
            { id: id },
            { $inc: { articleCount: -1 } }
        );
    }
}
