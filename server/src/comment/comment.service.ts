import { ArticleService } from '../article/article.service';
import { Injectable } from '@nestjs/common';
import { CommentDocument } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetCommentDto } from './dto/get-comment.dto';
import { GetResponse } from 'src/interfaces/get-response';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateResponse } from 'src/interfaces/create-response';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { DeleteResponse } from 'src/interfaces/delete-response';
import { CounterService } from 'src/counter/counter.service';
import { GetCommentListDto } from './dto/get-comment-list.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel('comment') private readonly commentModel: Model<CommentDocument>,
        private readonly counterService: CounterService,
        private readonly articleService: ArticleService
    ) { }

    // DB에 생성
    async create(request: CreateCommentDto): Promise<CreateResponse> {
        try {
            request.id = await this.counterService.getSequenceValue('comment');
            const commentInfo = await new this.commentModel(request).save();
            await this.articleService.increaseComment(request.articleId);
            console.log("Database access success");
            return {
                success: true,
                data: commentInfo
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
    async get(request: GetCommentDto): Promise<GetResponse> {
        try {
            const filter = { id: request.id };
            const commentInfo = await this.commentModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: commentInfo
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
    async getList(request: GetCommentListDto): Promise<GetResponse> {
        try {
            const filter = { articleId: request.articleId };
            const commentInfo = await this.commentModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: commentInfo
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
    async update(request: UpdateCommentDto): Promise<UpdateResponse> {
        try {
            const filter = {
                id: request.id
            };
            const update = { $set: request };
            const commentInfo = await this.commentModel.findOneAndUpdate(filter, update).exec();
            console.log("Database access success");
            return {
                success: true,
                data: commentInfo
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
    async delete(request: DeleteCommentDto): Promise<DeleteResponse> {
        try {
            const filter = {
                id: request.id
            };
            const articleId = (await this.commentModel.findOne(filter).exec()).articleId;
            await this.commentModel.deleteOne(filter).exec();
            await this.articleService.decreaseComment(articleId);
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
}
