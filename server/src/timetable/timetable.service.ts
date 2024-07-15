import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { TimetableDocument } from './schemas/timetable.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TimetableResponse } from './dto/timetable.response.dto';

@Injectable()
export class TimetableService {
    constructor(
        @InjectModel('timetable') private readonly timetableModel: Model<TimetableDocument>,
        private readonly httpService: HttpService) { }

    // 외부 API 요청
    find(office_code: string, school_code: string, date: string, grade: string, class_number: string) {
        const url = 'https://open.neis.go.kr/hub/hisTimetable?Type=json';
        const params = {
            ATPT_OFCDC_SC_CODE: office_code,
            SD_SCHUL_CODE: school_code,
            ALL_TI_YMD: date,
            GRADE: grade,
            CLASS_NM: class_number
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    // DB에 업데이트
    async update(office_code: string, school_code: string, date: string, grade: string, class_number: string): Promise<string> {
        try {
            const data = await this.find(office_code, school_code, date, grade, class_number).toPromise();
            if (data.hisTimetable[0].head[1].RESULT.CODE === "INFO-000") {
                const timetableInfo = {
                    row: data.hisTimetable[1].row,
                    SD_SCHUL_CODE: school_code,
                    GRADE: grade,
                    CLASS_NM: class_number,
                    ALL_TI_YMD: date
                };
                const filter = {
                    SD_SCHUL_CODE: school_code,
                    GRADE: grade,
                    CLASS_NM: class_number,
                    ALL_TI_YMD: date
                };
                const update = { $set: timetableInfo };
                const options = { upsert: true, new: true };

                await this.timetableModel.findOneAndUpdate(filter, update, options).exec();
                console.log("Database access success");
                return "success";
            } else {
                throw new Error(data.hisTimetable[0].head[1].RESULT.MESSAGE);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return `Error fetching data: ${err.message}`;
        }
    }

    // DB에서 불러오기
    async get(school_code: string, date: string, grade: string, class_number: string): Promise<TimetableResponse> {
        try {
            const filter = {
                SD_SCHUL_CODE: school_code,
                GRADE: grade,
                CLASS_NM: class_number,
                ALL_TI_YMD: date
            };
            const timetableInfo = await this.timetableModel.findOne(filter).exec();
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
