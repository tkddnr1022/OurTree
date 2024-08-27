import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetArticleListDto {
    @ApiProperty({ description: "게시판 ID" })
    @IsNumber()
    @IsNotEmpty()
    boardId: number;
}
