import { Body, Post, Get, Controller, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsDTO } from './metrics.dto';

@Controller('metrics')
export class MetricsController {
    constructor(
        private metricsService: MetricsService
    ){}

    @Post()
    async createMetrics(@Body() payload: MetricsDTO){
        return await this.metricsService.createMetrics(payload);
    }

    @Get()
    async getMetrics(@Query() query){
        return await this.metricsService.getMetrics(query);
    }
}
