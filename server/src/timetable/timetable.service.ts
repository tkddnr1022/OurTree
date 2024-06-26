import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimetableService {
    constructor(private readonly httpService: HttpService) { }

    findAll(): Observable<AxiosResponse<JSON>> {
        return this.httpService.get('https://open.neis.go.kr/hub/hisTimetable?Type=json&ATPT_OFCDC_SC_CODE=P10&SD_SCHUL_CODE=7003982&AY=2024').pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    find(office_code: string, school_code: string, date: string, grade: string, class_number: string) {
        const url = 'https://open.neis.go.kr/hub/hisTimetable?Type=json';
        const params = {
            ATPT_OFCDC_SC_CODE: office_code,
            SD_SCHUL_CODE: school_code,
            ALL_TI_YMD: date,
            GRADE: grade,
            CLASS_NM: class_number
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }
}
