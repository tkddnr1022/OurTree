import { SchoolService } from './school.service';
import { Body, Controller, Post, Put } from '@nestjs/common';

@Controller('school')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) { }

    @Post()
    getSchool(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
    ) {
        return this.schoolService.find(office_code, school_code);
    }

    @Put()
    async updateSchool(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
    ){
        return {"msg": await this.schoolService.update(office_code, school_code)};
    }
}
