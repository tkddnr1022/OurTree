import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetResponse } from '../interfaces/get-response';
import { SchoolService } from './school.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UpdateResponse } from 'src/interfaces/update-response';
import { GetSchoolDto } from './dto/get-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Controller('school')
@ApiTags('교육 정보 API')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) { }

    @Post()
    @ApiOperation({summary: "학교 정보 불러오기"})
    @ApiCreatedResponse({description: "불러오기 성공", type: GetResponse})
    getSchool(@Body() request: GetSchoolDto): Promise<GetResponse> {
        return this.schoolService.get(request);
    }

    @Post("update")
    @ApiOperation({summary: "학교 정보 업데이트"})
    @ApiCreatedResponse({description: "업데이트 성공", type: UpdateResponse})
    async updateSchool(@Body() request: UpdateSchoolDto): Promise<UpdateResponse> {
        return await this.schoolService.update(request);
    }
}
