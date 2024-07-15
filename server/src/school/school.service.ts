import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolDocument } from './schemas/school.schema';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { SchoolResponse } from './dto/school.response.dto';

@Injectable()
export class SchoolService {
    constructor(
        @InjectModel('school') private readonly schoolModel: Model<SchoolDocument>,
        private readonly httpService: HttpService
    ) { }

    // 외부 API 요청
    find(office_code: string, school_code: string) {
        const url = 'https://open.neis.go.kr/hub/schoolInfo?Type=json';
        const params = {
            ATPT_OFCDC_SC_CODE: office_code,
            SD_SCHUL_CODE: school_code,
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    // DB에 업데이트
    async update(office_code: string, school_code: string): Promise<string> {
        try {
            const data = await this.find(office_code, school_code).toPromise();

            if (data.schoolInfo[0].head[1].RESULT.CODE === "INFO-000") {
                const schoolInfo = data.schoolInfo[1].row[0];
                const filter = {
                    SD_SCHUL_CODE: schoolInfo.SD_SCHUL_CODE
                };
                const update = { $set: schoolInfo };
                const options = { upsert: true, new: true };

                await this.schoolModel.findOneAndUpdate(filter, update, options).exec();
                console.log("Database access success");
                return "success";
            } else {
                throw new Error(data.schoolInfo[0].head[1].RESULT.MESSAGE);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return `Error fetching data: ${err.message}`;
        }
    }

    // DB에서 불러오기
    async get(school_code: string): Promise<SchoolResponse> {
        try {
            const filter = {
                SD_SCHUL_CODE: school_code
            };
            const schoolInfo = await this.schoolModel.findOne(filter).exec();
            console.log("Database access success");
            return {
                success: true,
                data: schoolInfo
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