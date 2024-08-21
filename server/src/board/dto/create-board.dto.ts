import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateBoardDto {
    id?: number;

    @ApiProperty({ description: "게시판 이름" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: "게시판 설명" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: "게시판 상태" })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
