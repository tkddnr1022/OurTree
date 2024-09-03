import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetArticleDto {
    @ApiProperty({ description: "게시글 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
