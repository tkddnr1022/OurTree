import { Body, Controller, Post, Put } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableResponseDto } from './dto/timetable-response.dto';
import { TimetableRequestDto } from './dto/timetable-request.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('timetable')
@ApiTags("교육 정보 API")
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) { }

    @Post()
    @ApiOperation({summary: "시간표 불러오기"})
    @ApiCreatedResponse({description: "불러오기 성공", type: TimetableResponseDto})
    getTimetable(@Body() request: TimetableRequestDto): Promise<TimetableResponseDto> {
        return this.timetableService.get(request);
    }

    @Put()
    async updateTimetable(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('date') date: string,
        @Body('grade') grade: string,
        @Body('class_number') class_number: string
    ) {
        return { "msg": await this.timetableService.update(office_code, school_code, date, grade, class_number) };
    }
}
