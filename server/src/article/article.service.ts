import { Injectable } from '@nestjs/common';
import { ArticleDocument } from './schemas/article.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetArticleDto } from './dto/get-article.dto';
import { GetResponse } from 'src/interfaces/get-response';
import { CreateArticleDto } from './dto/create-article.dto';
import { CreateResponse } from 'src/interfaces/create-response';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { DeleteResponse } from 'src/interfaces/delete-response';
import { CounterService } from 'src/counter/counter.service';
import { GetArticleListDto } from './dto/get-article-list.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SearchArticleDto } from './dto/search-article.dto';

@Injectable()
export class ArticleService {
    constructor(
        @InjectModel('article') private readonly articleModel: Model<ArticleDocument>,
        private readonly counterService: CounterService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    // DB에 생성
    async create(request: CreateArticleDto): Promise<CreateResponse> {
        try {
            request.id = await this.counterService.getSequenceValue('article');
            const articleInfo = await new this.articleModel(request).save();
            this.eventEmitter.emit('article.created', request.boardId);
            console.log("Database access success");
            return {
                success: true,
                data: articleInfo
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
    async get(request: GetArticleDto): Promise<GetResponse> {
        try {
            const filter = { id: request.id };
            const articleInfo = await this.articleModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: articleInfo
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
    async getList(request: GetArticleListDto): Promise<GetResponse> {
        try {
            const filter = { boardId: request.boardId };
            const articleInfo = await this.articleModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: articleInfo
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
    async update(request: UpdateArticleDto): Promise<UpdateResponse> {
        try {
            const filter = {
                id: request.id
            };
            const update = { $set: request };
            const articleInfo = await this.articleModel.findOneAndUpdate(filter, update).exec();
            console.log("Database access success");
            return {
                success: true,
                data: articleInfo
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
    async delete(request: DeleteArticleDto): Promise<DeleteResponse> {
        try {
            const filter = {
                id: request.id
            };
            const boardId = (await this.articleModel.findOne(filter).exec()).boardId;
            await this.articleModel.deleteOne(filter).exec();
            this.eventEmitter.emit('article.deleted', { articleId: request.id, boardId: boardId });
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

    // DB에서 검색
    async search(request: SearchArticleDto): Promise<GetResponse> {
        try {
            const limit = 10;   // 페이지 당 10개 결과로 제한
            const skip = (request.page - 1) * limit;
            const regex = new RegExp(request.keyword, 'i');
            const filter: any = {
                $or: [
                    { title: { $regex: regex } },
                    { description: { $regex: regex } }
                ]
            };
            if (request.boardId !== undefined) {
                filter.boardId = request.boardId;
            }
            const articleInfo = await this.articleModel.find(filter).skip(skip).limit(limit).exec();
            console.log("Database access success");
            return {
                success: true,
                data: articleInfo
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }

    @OnEvent('board.deleted')
    async deleteMany(boardId: number): Promise<void> {
        const articles = await this.articleModel.find({ boardId: boardId }).exec();
        const articleIds = articles.map(article => article.id);
        this.eventEmitter.emit('articles.deleted', articleIds);
        await this.articleModel.deleteMany({ boardId: boardId });
    }

    @OnEvent('comment.created')
    async increaseComment(id: number): Promise<void> {
        await this.articleModel.findOneAndUpdate(
            { id: id },
            { $inc: { commentCount: 1 } }
        );
    }

    @OnEvent('comment.deleted')
    async decreaseComment(id: number): Promise<void> {
        await this.articleModel.findOneAndUpdate(
            { id: id },
            { $inc: { commentCount: -1 } }
        );
    }
}
