import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetTimetableDto {
    @ApiProperty({ description: "학교 코드" })
    @IsString()
    @IsNotEmpty()
    school_code: string;

    @ApiProperty({ description: "날짜(yyyymmdd)" })
    @IsString()
    @IsNotEmpty()
    date: string;

    @ApiProperty({ description: "학년" })
    @IsString()
    @IsNotEmpty()
    grade: string;

    @ApiProperty({ description: "반" })
    @IsString()
    @IsNotEmpty()
    class_number: string;
}
