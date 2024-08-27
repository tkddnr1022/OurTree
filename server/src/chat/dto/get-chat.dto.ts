import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetChatDto {
    @ApiProperty({ description: "쪽지 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
