import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetResponse } from 'src/interfaces/get-response';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { CreateResponse } from 'src/interfaces/create-response';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DeleteResponse } from 'src/interfaces/delete-response';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { GetCommentListDto } from './dto/get-comment-list.dto';

@ApiTags('댓글')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    @ApiOperation({ summary: "댓글 생성" })
    @ApiCreatedResponse({ description: "생성 성공", type: CreateResponse })
    async createComment(@Body() request: CreateCommentDto): Promise<CreateResponse> {
        return await this.commentService.create(request);
    }

    @Get()
    @ApiOperation({ summary: "댓글 불러오기" })
    @ApiOkResponse({ description: "불러오기 성공", type: GetResponse })
    async getComment(@Query() request: GetCommentDto): Promise<GetResponse> {
        return await this.commentService.get(request);
    }

    @Get('list')
    @ApiOperation({ summary: "댓글 목록 불러오기" })
    @ApiOkResponse({ description: "불러오기 성공", type: GetResponse })
    async getCommentList(@Query() request: GetCommentListDto): Promise<GetResponse> {
        return await this.commentService.getList(request);
    }

    @Patch()
    @ApiOperation({ summary: "댓글 수정"})
    @ApiOkResponse({ description: "수정 성공", type: UpdateResponse})
    async updateComment(@Body() request: UpdateCommentDto): Promise<UpdateResponse>{
        return await this.commentService.update(request);
    }

    @Delete()
    @ApiOperation({ summary: "댓글 삭제"})
    @ApiNoContentResponse({ description: "삭제 성공", type: DeleteResponse})
    async deleteComment(@Body() request: DeleteCommentDto): Promise<DeleteResponse>{
        return await this.commentService.delete(request);
    }
}
