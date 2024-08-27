import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetCommentDto {
    @ApiProperty({ description: "댓글 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
