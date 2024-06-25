import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TimetableService {
    constructor(private readonly httpService: HttpService) {}
    
    findAll(): Observable<AxiosResponse<JSON>> {
        return this.httpService.get('https://open.neis.go.kr/hub/hisTimetable?Type=json&ATPT_OFCDC_SC_CODE=P10&SD_SCHUL_CODE=7003982&AY=2024').pipe(
            map((response: AxiosResponse) => response.data)
        );
    }
}
