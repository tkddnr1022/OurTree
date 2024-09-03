import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class GetCommentListDto {
    @ApiProperty({ description: "게시글 ID" })
    @IsNumber()
    @IsNotEmpty()
    articleId: number;
}
