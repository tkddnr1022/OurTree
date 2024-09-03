import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { map } from 'rxjs';
import { ScheduleDocument } from './schemas/schedule.schema';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { GetResponse } from 'src/interfaces/get-response';
import { GetScheduleDto } from './dto/get-schedule.dto';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectModel('schedule') private readonly scheduleModel: Model<ScheduleDocument>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService) { }

    // 외부 API 요청
    find(request: UpdateScheduleDto) {
        const url = 'https://open.neis.go.kr/hub/SchoolSchedule';
        const params = {
            Type: "json",
            KEY: this.configService.get<string>("API_KEY"),
            ATPT_OFCDC_SC_CODE: request.office_code,
            SD_SCHUL_CODE: request.school_code,
            AA_FROM_YMD: `${request.ym}01`,
            AA_TO_YMD: `${request.ym}31`
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    // DB에 업데이트
    async update(request: UpdateScheduleDto): Promise<UpdateResponse> {
        try {
            const data = await this.find(request).toPromise();
            if (data.SchoolSchedule[0].head[1].RESULT.CODE === "INFO-000") {
                const scheduleInfo = {
                    row: data.SchoolSchedule[1].row,
                    SD_SCHUL_CODE: request.school_code,
                    YEARMONTH: request.ym
                };
                const filter = {
                    SD_SCHUL_CODE: request.school_code,
                    YEARMONTH: request.ym
                };
                const update = { $set: scheduleInfo };
                const options = { upsert: true, new: true };

                await this.scheduleModel.findOneAndUpdate(filter, update, options).exec();
                console.log("Database access success");
                return {
                    success: true,
                    count: data.SchoolSchedule[0].head[0].list_total_count
                };
            } else {
                throw new Error(data.SchoolSchedule[0].head[1].RESULT.MESSAGE);
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
    async get(request: GetScheduleDto): Promise<GetResponse> {
        try {
            const filter = {
                SD_SCHUL_CODE: request.school_code,
                YEARMONTH: request.ym
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
