import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class GetBoardDto {
    @ApiProperty({ description: "게시판 ID" })
    @IsNumber()
    @IsOptional()
    id?: number;
}
