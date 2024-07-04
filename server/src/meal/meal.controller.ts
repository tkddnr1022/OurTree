import { Body, Controller, Post } from '@nestjs/common';
import { MealService } from './meal.service';

@Controller('meal')
export class MealController {
    constructor(private readonly mealService: MealService) { }

    @Post()
    getMeal(
        @Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('date') date: string
    ) {
        return this.mealService.find(office_code, school_code, date);
    }

    
}
