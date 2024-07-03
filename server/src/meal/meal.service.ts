import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MealService {
    constructor(private readonly httpService: HttpService) { }

    findAll(): Observable<AxiosResponse<JSON>> {
        return this.httpService.get('https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=P10&SD_SCHUL_CODE=7003982&MLSV_YMD=20240703').pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    find(office_code: string, school_code: string, date: string) {
        const url = 'https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json';
        const params = {
            ATPT_OFCDC_SC_CODE: office_code,
            SD_SCHUL_CODE: school_code,
            MLSV_YMD: date
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }
}
