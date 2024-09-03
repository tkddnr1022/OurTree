import { Injectable } from '@nestjs/common';
import { ChatDocument } from './schemas/chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GetChatDto } from './dto/get-chat.dto';
import { GetResponse } from 'src/interfaces/get-response';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateResponse } from 'src/interfaces/create-response';
import { DeleteChatDto } from './dto/delete-chat.dto';
import { DeleteResponse } from 'src/interfaces/delete-response';
import { CounterService } from 'src/counter/counter.service';
import { GetChatListDto } from './dto/get-chat-list.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel('chat') private readonly chatModel: Model<ChatDocument>,
        private readonly counterService: CounterService,
    ) { }

    // DB에 생성
    async create(request: CreateChatDto): Promise<CreateResponse> {
        try {
            request.id = await this.counterService.getSequenceValue('chat');
            const chatInfo = await new this.chatModel(request).save();
            // Todo: 채팅 생성시 알림 카운터
            // await this.userService.increaseChat(request.receiverId);
            console.log("Database access success");
            return {
                success: true,
                data: chatInfo
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
    async get(request: GetChatDto): Promise<GetResponse> {
        try {
            const filter = { id: request.id };
            const chatInfo = await this.chatModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: chatInfo
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
    async getList(request: GetChatListDto): Promise<GetResponse> {
        try {
            const filter = {
                $or: [
                    { senderId: request.userId },
                    { receiverId: request.userId }
                ]
            };
            const chatInfo = await this.chatModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: chatInfo
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }

    // DB에서 삭제
    async delete(request: DeleteChatDto): Promise<DeleteResponse> {
        try {
            const filter = {
                id: request.id
            };
            const receiverId = (await this.chatModel.findOne(filter).exec()).receiverId;
            await this.chatModel.deleteOne(filter).exec();
            // Todo: 채팅 삭제시 알림 카운터
            // await this.userService.decreaseChat(receiverId);
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
