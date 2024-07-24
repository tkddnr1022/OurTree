import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SchoolRequestDto } from './dto/school-request.dto';
import { SchoolResponseDto } from './dto/school-response.dto';
import { SchoolService } from './school.service';
import { Body, Controller, Post, Put } from '@nestjs/common';

@Controller('school')
@ApiTags('교육 정보 API')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) { }

    @Post()
    @ApiOperation({summary: "학교 정보 불러오기"})
    @ApiCreatedResponse({description: "불러오기 성공", type: SchoolResponseDto})
    getSchool(@Body() request: SchoolRequestDto): Promise<SchoolResponseDto> {
        return this.schoolService.get(request);
    }

    @Put()
    async updateSchool(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
    ) {
        return { "msg": await this.schoolService.update(office_code, school_code) };
    }
}
