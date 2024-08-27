import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateArticleDto {
    id?: number;

    @ApiProperty({ description: "게시글 제목" })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: "게시글 내용" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: "게시글 작성자" })
    @IsString()
    @IsNotEmpty()
    authorId: string;

    @ApiProperty({ description: "게시판 ID" })
    @IsNumber()
    @IsNotEmpty()
    boardId: number;
}
