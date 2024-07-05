import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { MealDocument } from './schemas/meal.schema';

@Injectable()
export class MealService {
    constructor(
        @InjectModel('meal') private readonly mealModel: Model<MealDocument>,
        private readonly httpService: HttpService) { }

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

    async update(office_code: string, school_code: string, date: string): Promise<string> {
        try {
            const data = await this.find(office_code, school_code, date).toPromise();
            if (data.mealServiceDietInfo[0].head[1].RESULT.CODE === "INFO-000") {
                const mealInfo = {
                    row: data.mealServiceDietInfo[1].row,
                    SD_SCHUL_CODE: school_code,
                    MLSV_YMD: date
                };
                const filter = {
                    SD_SCHUL_CODE: school_code,
                    MLSV_YMD: date
                };
                const update = { $set: mealInfo };
                const options = { upsert: true, new: true };

                await this.mealModel.findOneAndUpdate(filter, update, options).exec();
                console.log("Database access success");
                return "success";
            } else {
                throw new Error(data.mealServiceDietInfo[0].head[1].RESULT.MESSAGE);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return `Error fetching data: ${err.message}`;
        }
    }
}
