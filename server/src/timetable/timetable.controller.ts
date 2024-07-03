import { Body, Controller, Get, Post } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('timetable')
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) { }

    @Get()
    getTimetables(): Observable<AxiosResponse<JSON>> {
        return this.timetableService.findAll();
    }

    @Post()
    getTimetable(@Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('date') date: string,
        @Body('grade') grade: string,
        @Body('class_number') class_number: string): Observable<AxiosResponse<JSON>> {
        return this.timetableService.find(office_code, school_code, date, grade, class_number);
    }
}
