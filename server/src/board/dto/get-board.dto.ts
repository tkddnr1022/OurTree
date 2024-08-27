import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetBoardDto {
    @ApiPropertyOptional({ description: "게시판 ID" })
    @IsNumber()
    @IsOptional()
    id?: number;
}
