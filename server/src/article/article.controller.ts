import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetResponse } from 'src/interfaces/get-response';
import { GetArticleDto } from './dto/get-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { CreateResponse } from 'src/interfaces/create-response';
import { CreateArticleDto } from './dto/create-article.dto';
import { DeleteResponse } from 'src/interfaces/delete-response';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { GetArticleListDto } from './dto/get-article-list.dto';

@ApiTags('게시글')
@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) { }

    @Post()
    @ApiOperation({ summary: "게시글 생성" })
    @ApiCreatedResponse({ description: "생성 성공", type: CreateResponse })
    async createArticle(@Body() request: CreateArticleDto): Promise<CreateResponse> {
        return await this.articleService.create(request);
    }

    @Get()
    @ApiOperation({ summary: "게시글 불러오기" })
    @ApiOkResponse({ description: "불러오기 성공", type: GetResponse })
    async getArticle(@Query() request: GetArticleDto): Promise<GetResponse> {
        return await this.articleService.get(request);
    }

    @Get('list')
    @ApiOperation({ summary: "게시글 목록 불러오기" })
    @ApiOkResponse({ description: "불러오기 성공", type: GetResponse })
    async getArticleList(@Query() request: GetArticleListDto): Promise<GetResponse> {
        return await this.articleService.getList(request);
    }

    @Patch()
    @ApiOperation({ summary: "게시글 수정"})
    @ApiOkResponse({ description: "수정 성공", type: UpdateResponse})
    async updateArticle(@Body() request: UpdateArticleDto): Promise<UpdateResponse>{
        return await this.articleService.update(request);
    }

    @Delete()
    @ApiOperation({ summary: "게시글 삭제"})
    @ApiNoContentResponse({ description: "삭제 성공", type: DeleteResponse})
    async deleteArticle(@Body() request: DeleteArticleDto): Promise<DeleteResponse>{
        return await this.articleService.delete(request);
    }
}
