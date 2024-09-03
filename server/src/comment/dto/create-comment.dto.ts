import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDto {
    id?: number;

    @ApiProperty({ description: "댓글 내용" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: "댓글 작성자" })
    @IsString()
    @IsNotEmpty()
    authorId: string;

    @ApiProperty({ description: "게시글 ID" })
    @IsNumber()
    @IsNotEmpty()
    articleId: number;
}
