import { Body, Controller, Post, Put } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealResponseDto } from './dto/meal-response.dto';
import { MealRequestDto } from './dto/meal-request.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('meal')
@ApiTags('교육 정보 API')
export class MealController {
    constructor(private readonly mealService: MealService) { }

    @Post()
    @ApiOperation({summary: "급식표 불러오기"})
    @ApiCreatedResponse({description: "불러오기 성공", type: MealResponseDto})
    getMeal(@Body() request: MealRequestDto): Promise<MealResponseDto> {
        return this.mealService.get(request);
    }

    @Put()
    async updateMeal(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('date') date: string
    ) {
        return { "msg": await this.mealService.update(office_code, school_code, date) };
    }
}
