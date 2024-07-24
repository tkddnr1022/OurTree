import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SchoolRequestDto {
    @ApiProperty({ description: "학교 코드" })
    @IsString()
    @IsNotEmpty()
    school_code: string;
}
