import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetMealDto {
    @ApiProperty({ description: "학교 코드" })
    @IsString()
    @IsNotEmpty()
    school_code: string;

    @ApiProperty({ description: "날짜(yyyyddmm)" })
    @IsString()
    @IsNotEmpty()
    date: string;
}
