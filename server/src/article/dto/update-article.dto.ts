import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateArticleDto {
    @ApiProperty({ description: "게시글 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiPropertyOptional({ description: "게시글 제목" })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ description: "게시글 내용" })
    @IsString()
    @IsOptional()
    description?: string;
}
