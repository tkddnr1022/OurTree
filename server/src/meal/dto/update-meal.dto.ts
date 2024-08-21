import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMealDto {
    @ApiProperty({ description: "교육청 코드" })
    @IsString()
    @IsNotEmpty()
    office_code: string;

    @ApiProperty({ description: "학교 코드" })
    @IsString()
    @IsNotEmpty()
    school_code: string;

    @ApiProperty({ description: "시작 날짜(yyyyddmm)" })
    @IsString()
    @IsNotEmpty()
    date_start: string;

    @ApiProperty({ description: "종료 날짜(yyyyddmm)" })
    @IsString()
    @IsNotEmpty()
    date_end: string;
}
