import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetResponse } from 'src/interfaces/get-response';
import { GetTimetableDto } from './dto/get-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { UpdateResponse } from 'src/interfaces/update-response';

@Controller('timetable')
@ApiTags("시간표")
export class TimetableController {
    constructor(private readonly timetableService: TimetableService) { }

    @Get()
    @ApiOperation({ summary: "시간표 불러오기" })
    @ApiCreatedResponse({ description: "불러오기 성공", type: GetResponse })
    getTimetable(@Query() request: GetTimetableDto): Promise<GetResponse> {
        return this.timetableService.get(request);
    }

    @Post("update")
    @ApiOperation({ summary: "시간표 업데이트" })
    @ApiCreatedResponse({ description: "업데이트 성공", type: UpdateResponse })
    async updateTimetable(@Body() request: UpdateTimetableDto): Promise<UpdateResponse> {
        return await this.timetableService.update(request);
    }
}
