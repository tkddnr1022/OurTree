import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetResponse } from 'src/interfaces/get-response';
import { GetScheduleDto } from './dto/get-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { UpdateResponse } from 'src/interfaces/update-response';

@Controller('schedule')
@ApiTags('학사 일정')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) { }

    @Get()
    @ApiOperation({ summary: "학사 일정 불러오기" })
    @ApiCreatedResponse({ description: "불러오기 성공", type: GetResponse })
    async getSchedule(@Query() request: GetScheduleDto): Promise<GetResponse> {
        return await this.scheduleService.get(request);
    }

    @Post("update")
    @ApiOperation({ summary: "학사 일정 업데이트" })
    @ApiCreatedResponse({ description: "업데이트 성공", type: UpdateScheduleDto })
    async updateSchedule(@Body() request: UpdateScheduleDto): Promise<UpdateResponse> {
        return await this.scheduleService.update(request);
    }
}
