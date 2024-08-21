import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateBoardDto {
    @ApiProperty({ description: "게시판 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: "게시판 이름" })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: "게시판 설명" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: "게시판 상태" })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
