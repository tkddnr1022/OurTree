import { Body, Controller, Post, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) { }

    @Post()
    getSchedule(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('ym') ym: string
    ) {
        return this.scheduleService.find(office_code, school_code, ym);
    }

    @Put()
    async updateSchedule(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('ym') ym: string
    ){
        return {"msg": await this.scheduleService.update(office_code, school_code, ym)};
    }
}
