import { Controller, Get } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('timetable')
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) { }

    @Get()
    getTimetable(): Observable<AxiosResponse<JSON>> {
        return this.timetableService.findAll();
    }
}
