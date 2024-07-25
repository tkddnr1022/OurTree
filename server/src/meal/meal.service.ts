import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { MealDocument } from './schemas/meal.schema';
import { ConfigService } from '@nestjs/config';
import { GetMealDto } from './dto/get-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { GetResponse } from 'src/interfaces/get-response';

@Injectable()
export class MealService {
    constructor(
        @InjectModel('meal') private readonly mealModel: Model<MealDocument>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService) { }

    // 외부 API 요청
    find(request: UpdateMealDto) {
        const url = 'https://open.neis.go.kr/hub/mealServiceDietInfo';
        const params = {
            Type: "json",
            KEY: this.configService.get<string>("API_KEY"),
            ATPT_OFCDC_SC_CODE: request.office_code,
            SD_SCHUL_CODE: request.school_code,
            MLSV_FROM_YMD: request.date_start,
            MLSV_TO_YMD: request.date_end
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    // DB에 업데이트
    async update(request: UpdateMealDto): Promise<UpdateResponse> {
        try {
            const data = await this.find(request).toPromise();
            if (data.mealServiceDietInfo[0].head[1].RESULT.CODE === "INFO-000") {
                let count = 0;
                for (const mealInfo of data.mealServiceDietInfo[1].row) {
                    const filter = {
                        SD_SCHUL_CODE: mealInfo.SD_SCHUL_CODE,
                        MLSV_YMD: mealInfo.MLSV_YMD,
                        MMEAL_SC_CODE: mealInfo.MMEAL_SC_CODE
                    };
                    const update = { $set: mealInfo };
                    const options = { upsert: true, new: true };

                    await this.mealModel.findOneAndUpdate(filter, update, options).exec();
                    count++;
                }
                console.log("Database access success");
                return {
                    success: true,
                    count: count
                };
            } else {
                throw new Error(data.mealServiceDietInfo[0].head[1].RESULT.MESSAGE);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }

    // DB에서 불러오기
    async get(request: GetMealDto): Promise<GetResponse> {
        try {
            const filter = {
                SD_SCHUL_CODE: request.school_code,
                MLSV_YMD: request.date
            };
            const mealInfo = await this.mealModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: mealInfo
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }
}
