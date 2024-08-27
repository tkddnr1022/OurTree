import { Body, Controller, Post } from '@nestjs/common';
import { MealService } from './meal.service';
import { GetMealDto } from './dto/get-meal.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateMealDto } from './dto/update-meal.dto';
import { GetResponse } from 'src/interfaces/get-response';
import { UpdateResponse } from 'src/interfaces/update-response';

@Controller('meal')
@ApiTags('급식표')
export class MealController {
    constructor(private readonly mealService: MealService) { }

    @Post()
    @ApiOperation({ summary: "급식표 불러오기" })
    @ApiCreatedResponse({ description: "불러오기 성공", type: GetResponse })
    getMeal(@Body() request: GetMealDto): Promise<GetResponse> {
        return this.mealService.get(request);
    }

    @Post("update")
    @ApiOperation({ summary: "급식표 업데이트" })
    @ApiCreatedResponse({ description: "업데이트 성공", type: UpdateResponse })
    async updateMeal(@Body() request: UpdateMealDto): Promise<UpdateResponse> {
        return await this.mealService.update(request);
    }
}
