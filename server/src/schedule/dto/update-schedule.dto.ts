import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateScheduleDto {
    @ApiProperty({ description: "교육청 코드" })
    @IsString()
    @IsNotEmpty()
    office_code: string;

    @ApiProperty({ description: "학교 코드" })
    @IsString()
    @IsNotEmpty()
    school_code: string;

    @ApiProperty({ description: "날짜(yyyymm)" })
    @IsString()
    @IsNotEmpty()
    ym: string;
}
