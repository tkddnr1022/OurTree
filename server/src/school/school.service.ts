import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolDocument } from './schemas/school.schema';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GetResponse } from '../interfaces/get-response';
import { ConfigService } from '@nestjs/config';
import { UpdateResponse } from 'src/interfaces/update-response';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { GetSchoolDto } from './dto/get-school.dto';

@Injectable()
export class SchoolService {
    constructor(
        @InjectModel('school') private readonly schoolModel: Model<SchoolDocument>,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) { }

    // 외부 API 요청
    find(request: UpdateSchoolDto) {
        const url = 'https://open.neis.go.kr/hub/schoolInfo';
        const params = {
            Type: "json",
            KEY: this.configService.get<string>("API_KEY"),
            ATPT_OFCDC_SC_CODE: request.office_code,
            SD_SCHUL_CODE: request.school_code,
        };
        return this.httpService.get(url, { params }).pipe(
            map((response: AxiosResponse) => response.data)
        );
    }

    // DB에 업데이트
    async update(request: UpdateSchoolDto): Promise<UpdateResponse> {
        try {
            const data = await this.find(request).toPromise();

            if (data.schoolInfo[0].head[1].RESULT.CODE === "INFO-000") {
                const schoolInfo = data.schoolInfo[1].row[0];
                const filter = {
                    SD_SCHUL_CODE: schoolInfo.SD_SCHUL_CODE
                };
                const update = { $set: schoolInfo };
                const options = { upsert: true, new: true };

                await this.schoolModel.findOneAndUpdate(filter, update, options).exec();
                console.log("Database access success");
                return {
                    success: true,
                    count: data.schoolInfo[0].head[0].list_total_count
                }
            } else {
                throw new Error(data.schoolInfo[0].head[1].RESULT.MESSAGE);
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
    async get(request: GetSchoolDto): Promise<GetResponse> {
        try {
            const filter = {
                SD_SCHUL_CODE: request.school_code
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

    // DB에 생성
    // 중복 데이터 생성이 우려되어 보류
    // findOneAndUpdate() 성능 문제로 고민중
    /*
    async create(office_code: string, school_code: string): Promise<GetResponse> {
        try {
            const data = await this.find(office_code, school_code).toPromise();
            if (data.schoolInfo[0].head[1].RESULT.CODE === "INFO-000") {
                const schoolInfo = data.schoolInfo[1].row[0];
                await new this.schoolModel(schoolInfo).save();
                console.log("Database access success");
                return {
                    success: true
                }
            } else {
                throw new Error(data.schoolInfo[0].head[1].RESULT.MESSAGE);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            return {
                success: false,
                error: `Error fetching data: ${err.message}`
            };
        }
    }
    */
}