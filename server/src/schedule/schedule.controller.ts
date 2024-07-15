import { Body, Controller, Post, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleResponse } from './dto/schedule.response.dto';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) { }

    @Post()
    async getSchedule(
        @Body('school_code') school_code: string,
        @Body('ym') ym: string
    ): Promise<ScheduleResponse> {
        return await this.scheduleService.get(school_code, ym);
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
