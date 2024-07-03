import { Body, Controller, Get, Post } from '@nestjs/common';
import { MealService } from './meal.service';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('meal')
export class MealController {
    constructor(private readonly mealService: MealService) { }

    @Get()
    getMeals(): Observable<AxiosResponse<JSON>> {
        return this.mealService.findAll();
    }

    @Post()
    getMeal(@Body('office_code') office_code: string,
        @Body('school_code') school_code: string,
        @Body('date') date: string
    ): Observable<AxiosResponse<JSON>> {
        return this.mealService.find(office_code, school_code, date);
    }
}
