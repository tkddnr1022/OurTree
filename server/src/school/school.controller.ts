import { SchoolResponse } from './dto/school.response.dto';
import { SchoolService } from './school.service';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('school')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) { }

    @Post()
    getSchool(
        @Body('school_code') school_code: string,
    ): Promise<SchoolResponse> {
        return this.schoolService.get(school_code);
    }

    @Put()
    async updateSchool(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
    ) {
        return { "msg": await this.schoolService.update(office_code, school_code) };
    }
}
