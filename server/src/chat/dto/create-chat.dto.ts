import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChatDto {
    id?: number;

    @ApiProperty({ description: "쪽지 내용" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: "보내는 사람 ID" })
    @IsString()
    @IsNotEmpty()
    senderId: string;

    @ApiProperty({ description: "받는 사람 ID" })
    @IsString()
    @IsNotEmpty()
    receiverId: string;
}
