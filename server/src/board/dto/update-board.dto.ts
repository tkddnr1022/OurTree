import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateBoardDto {
    @ApiProperty({ description: "게시판 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiPropertyOptional({ description: "게시판 이름" })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ description: "게시판 설명" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ description: "게시판 상태" })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
