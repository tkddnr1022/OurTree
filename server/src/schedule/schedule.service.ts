import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs';

@Injectable()
export class ScheduleService {
    constructor(private readonly httpService: HttpService) { }

    find(office_code: string, school_code: string, date: string) {
        date = date.substring(0, 4);
        const url = 'https://open.neis.go.kr/hub/SchoolSchedule?Type=json';
        const params = {
            ATPT_OFCDC_SC_CODE: office_code,
            SD_SCHUL_CODE: school_code,
            AA_FROM_YMD: `${date}0101`,
            AA_TO_YMD: `${date}1231`
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }
}
