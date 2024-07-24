import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { MealDocument } from './schemas/meal.schema';
import { MealResponseDto } from './dto/meal-response.dto';
import { ConfigService } from '@nestjs/config';
import { MealRequestDto } from './dto/meal-request.dto';

@Injectable()
export class MealService {
    constructor(
        @InjectModel('meal') private readonly mealModel: Model<MealDocument>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService) { }

    // 외부 API 요청
    find(office_code: string, school_code: string, date: string) {
        const url = 'https://open.neis.go.kr/hub/mealServiceDietInfo';
        const params = {
            Type: "json",
            KEY: this.configService.get<string>("API_KEY"),
            ATPT_OFCDC_SC_CODE: office_code,
            SD_SCHUL_CODE: school_code,
            MLSV_YMD: date
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    // DB에 업데이트
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

    // DB에서 불러오기
    async get(request: MealRequestDto): Promise<MealResponseDto> {
        try {
            const filter = {
                SD_SCHUL_CODE: request.school_code,
                MLSV_YMD: request.date
            };
            const mealInfo = await this.mealModel.findOne(filter).exec();
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
