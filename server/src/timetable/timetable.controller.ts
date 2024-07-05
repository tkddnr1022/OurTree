import { Body, Controller, Post, Put } from '@nestjs/common';
import { TimetableService } from './timetable.service';

@Controller('timetable')
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) { }

    @Post()
    getTimetable(@Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('date') date: string,
        @Body('grade') grade: string,
        @Body('class_number') class_number: string) {
        return this.timetableService.find(office_code, school_code, date, grade, class_number);
    }

    @Put()
    async updateTimetable(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('date') date: string,
        @Body('grade') grade: string,
        @Body('class_number') class_number: string
    ){
        return {"msg": await this.timetableService.update(office_code, school_code, date, grade, class_number)};
    }
}
