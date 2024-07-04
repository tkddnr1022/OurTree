import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import formatYMD from 'scripts/date_format';

@Injectable()
export class MealService {
    constructor(private readonly httpService: HttpService) { }

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

    @Timeout(1000)
    update() {
        const date = formatYMD(new Date());

        this.find("P10", "7003982", date).subscribe({
            next: (data) => {
                console.log("update meal");
                if (data.mealServiceDietInfo[0].head[1].RESULT.CODE == "INFO-000") {
                    //this.firebaseService.setData(`schools/7003982/meal/${date}`, data.mealServiceDietInfo[1].row);
                }
                else {
                    throw new Error(data.mealServiceDietInfo[0].head[1].RESULT.CODE);
                }
            },
            error: (error) => console.error('Error fetching data:', error)
        });
    }
}
