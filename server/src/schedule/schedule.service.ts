import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { ScheduleDocument } from './schemas/schedule.schema';
import { ScheduleResponse } from './dto/schedule.response.dto';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectModel('schedule') private readonly scheduleModel: Model<ScheduleDocument>,
        private readonly httpService: HttpService) { }

    // 외부 API 요청
    find(office_code: string, school_code: string, ym: string) {
        const url = 'https://open.neis.go.kr/hub/SchoolSchedule?Type=json';
        const params = {
            ATPT_OFCDC_SC_CODE: office_code,
            SD_SCHUL_CODE: school_code,
            AA_FROM_YMD: `${ym}01`,
            AA_TO_YMD: `${ym}31`
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    // DB에 업데이트
    async update(office_code: string, school_code: string, ym: string): Promise<string> {
        try {
            const data = await this.find(office_code, school_code, ym).toPromise();
            if (data.SchoolSchedule[0].head[1].RESULT.CODE === "INFO-000") {
                const scheduleInfo = {
                    row: data.SchoolSchedule[1].row,
                    SD_SCHUL_CODE: school_code,
                    YEARMONTH: ym
                };
                const filter = {
                    SD_SCHUL_CODE: school_code,
                    YEARMONTH: ym
                };
                const update = { $set: scheduleInfo };
                const options = { upsert: true, new: true };

                await this.scheduleModel.findOneAndUpdate(filter, update, options).exec();
                console.log("Database access success");
                return "success";
            } else {
                throw new Error(data.SchoolSchedule[0].head[1].RESULT.MESSAGE);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return `Error fetching data: ${err.message}`;
        }
    }

    // DB에서 불러오기
    async get(school_code: string, ym: string): Promise<ScheduleResponse> {
        try {
            const filter = {
                SD_SCHUL_CODE: school_code,
                YEARMONTH: ym
            };
            const scheduleInfo = await this.scheduleModel.findOne(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: scheduleInfo
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
