import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteArticleDto {
    @ApiProperty({ description: "게시글 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
