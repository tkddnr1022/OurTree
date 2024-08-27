import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetResponse } from 'src/interfaces/get-response';
import { GetChatDto } from './dto/get-chat.dto';
import { CreateResponse } from 'src/interfaces/create-response';
import { CreateChatDto } from './dto/create-chat.dto';
import { DeleteResponse } from 'src/interfaces/delete-response';
import { DeleteChatDto } from './dto/delete-chat.dto';
import { GetChatListDto } from './dto/get-chat-list.dto';

@ApiTags('쪽지')
@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post()
    @ApiOperation({ summary: "쪽지 생성" })
    @ApiCreatedResponse({ description: "생성 성공", type: CreateResponse })
    async createChat(@Body() request: CreateChatDto): Promise<CreateResponse> {
        return await this.chatService.create(request);
    }

    @Get()
    @ApiOperation({ summary: "쪽지 불러오기" })
    @ApiOkResponse({ description: "불러오기 성공", type: GetResponse })
    async getChat(@Query() request: GetChatDto): Promise<GetResponse> {
        return await this.chatService.get(request);
    }

    @Get('list')
    @ApiOperation({ summary: "쪽지 목록 불러오기" })
    @ApiOkResponse({ description: "불러오기 성공", type: GetResponse })
    async getChatList(@Query() request: GetChatListDto): Promise<GetResponse> {
        return await this.chatService.getList(request);
    }

    @Delete()
    @ApiOperation({ summary: "쪽지 삭제"})
    @ApiNoContentResponse({ description: "삭제 성공", type: DeleteResponse})
    async deleteChat(@Body() request: DeleteChatDto): Promise<DeleteResponse>{
        return await this.chatService.delete(request);
    }
}
