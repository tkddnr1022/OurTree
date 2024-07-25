import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { TimetableDocument } from './schemas/timetable.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { UpdateResponse } from 'src/interfaces/update-response';
import { GetTimetableDto } from './dto/get-timetable.dto';
import { GetResponse } from 'src/interfaces/get-response';

@Injectable()
export class TimetableService {
    constructor(
        @InjectModel('timetable') private readonly timetableModel: Model<TimetableDocument>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }

    // 외부 API 요청
    find(request: UpdateTimetableDto) {
        const url = 'https://open.neis.go.kr/hub/hisTimetable';
        const params = {
            Type: "json",
            KEY: this.configService.get<string>("API_KEY"),
            ATPT_OFCDC_SC_CODE: request.office_code,
            SD_SCHUL_CODE: request.school_code,
            GRADE: request.grade,
            CLASS_NM: request.class_number,
            TI_FROM_YMD: request.date_start,
            TI_TO_YMD: request.date_end
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    // DB에 업데이트
    async update(request: UpdateTimetableDto): Promise<UpdateResponse> {
        try {
            const data = await this.find(request).toPromise();
            if (data.hisTimetable[0].head[1].RESULT.CODE === "INFO-000") {
                let count = 0;
                for (const timetableInfo of data.hisTimetable[1].row) {
                    const filter = {
                        SD_SCHUL_CODE: timetableInfo.SD_SCHUL_CODE,
                        ALL_TI_YMD: timetableInfo.ALL_TI_YMD,
                        GRADE: timetableInfo.GRADE,
                        CLASS_NM: timetableInfo.CLASS_NM,
                        PERIO: timetableInfo.PERIO,
                        ITRT_CNTNT: timetableInfo.ITRT_CNTNT
                    };
                    const update = { $set: timetableInfo };
                    const options = { upsert: true, new: true };

                    await this.timetableModel.findOneAndUpdate(filter, update, options).exec();
                    count++;
                }
                console.log("Database access success");
                return {
                    success: true,
                    count: count
                };
            } else {
                throw new Error(data.hisTimetable[0].head[1].RESULT.MESSAGE);
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
    async get(request: GetTimetableDto): Promise<GetResponse> {
        try {
            const filter = {
                SD_SCHUL_CODE: request.school_code,
                ALL_TI_YMD: request.date,
                GRADE: request.grade,
                CLASS_NM: request.class_number
            };
            const timetableInfo = await this.timetableModel.find(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: timetableInfo
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
