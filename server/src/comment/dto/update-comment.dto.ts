import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateCommentDto {
    @ApiProperty({ description: "댓글 ID" })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiPropertyOptional({ description: "댓글 내용" })
    @IsString()
    @IsOptional()
    description?: string;
}
