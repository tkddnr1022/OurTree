import { Body, Controller, Post, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleResponseDto } from './dto/schedule-response.dto';
import { ScheduleRequestDto } from './dto/schedule-request.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('schedule')
@ApiTags('교육 정보 API')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) { }

    @Post()
    @ApiOperation({summary: "학사 일정 불러오기"})
    @ApiCreatedResponse({description: "불러오기 성공", type: ScheduleResponseDto})
    async getSchedule(@Body() request: ScheduleRequestDto): Promise<ScheduleResponseDto> {
        return await this.scheduleService.get(request);
    }

    @Put()
    async updateSchedule(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('ym') ym: string
    ) {
        return { "msg": await this.scheduleService.update(office_code, school_code, ym) };
    }
}
