import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchArticleDto {
    @ApiProperty({ description: "검색어" })
    @IsString()
    @IsNotEmpty()
    keyword: string;

    @ApiProperty({ description: "페이지" })
    @IsNumber()
    @IsNotEmpty()
    page: number;

    @ApiProperty({ description: "게시판 ID" })
    @IsNumber()
    @IsOptional()
    boardId: number;
}
