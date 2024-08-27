import { Body, Controller, Post, Put } from '@nestjs/common';
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

    @Post()
    @ApiOperation({ summary: "학사 일정 불러오기" })
    @ApiCreatedResponse({ description: "불러오기 성공", type: GetResponse })
    async getSchedule(@Body() request: GetScheduleDto): Promise<GetResponse> {
        return await this.scheduleService.get(request);
    }

    @Post("update")
    @ApiOperation({ summary: "학사 일정 업데이트" })
    @ApiCreatedResponse({ description: "업데이트 성공", type: UpdateScheduleDto })
    async updateSchedule(@Body() request: UpdateScheduleDto): Promise<UpdateResponse> {
        return await this.scheduleService.update(request);
    }
}
