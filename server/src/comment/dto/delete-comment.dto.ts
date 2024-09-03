import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCommentDto {
    @ApiProperty({ description: "댓글 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
