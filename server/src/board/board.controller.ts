import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetResponse } from 'src/interfaces/get-response';
import { GetBoardDto } from './dto/get-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { CreateResponse } from 'src/interfaces/create-response';
import { CreateBoardDto } from './dto/create-board.dto';
import { DeleteResponse } from 'src/interfaces/delete-response';
import { DeleteBoardDto } from './dto/delete-board.dto';

@ApiTags('게시판')
@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) { }

    @Post()
    @ApiOperation({ summary: "게시판 생성" })
    @ApiCreatedResponse({ description: "생성 성공", type: CreateResponse })
    async createBoard(@Body() request: CreateBoardDto): Promise<CreateResponse> {
        return await this.boardService.create(request);
    }

    @Get()
    @ApiOperation({ summary: "게시판 불러오기" })
    @ApiOkResponse({ description: "불러오기 성공", type: GetResponse })
    async getBoard(@Query() request: GetBoardDto): Promise<GetResponse> {
        return await this.boardService.get(request);
    }

    @Get('list')
    @ApiOperation({ summary: "게시판 목록 불러오기" })
    @ApiOkResponse({ description: "불러오기 성공", type: GetResponse })
    async getBoardList(): Promise<GetResponse> {
        return await this.boardService.getList();
    }

    @Patch()
    @ApiOperation({ summary: "게시판 수정"})
    @ApiOkResponse({ description: "수정 성공", type: UpdateResponse})
    async updateBoard(@Body() request: UpdateBoardDto): Promise<UpdateResponse>{
        return await this.boardService.update(request);
    }

    @Delete()
    @ApiOperation({ summary: "게시판 삭제"})
    @ApiNoContentResponse({ description: "삭제 성공", type: DeleteResponse})
    async deleteBoard(@Body() request: DeleteBoardDto): Promise<DeleteResponse>{
        return await this.boardService.delete(request);
    }
}
