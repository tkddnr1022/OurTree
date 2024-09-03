import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteBoardDto {
    @ApiProperty({ description: "게시판 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;
}
