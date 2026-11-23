import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Roles } from './common/decorators/roles.decorator.js';
import { ParseAreaPipe, type Area } from './common/pipes/parse-area.pipe.js';
import { CreateDeliveryDto } from './dto/create-delivery.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('areas/:area')
  checkArea(@Param('area', ParseAreaPipe) area: Area) {
    return { area, valid: true };
  }

  @Post('deliveries')
  createDelivery(@Body() dto: CreateDeliveryDto) {
    return { status: 'created', delivery: dto };
  }

  @Roles('staff')
  @Get('staff/dashboard')
  getStaffDashboard() {
    return { message: 'Staff area' };
  }

  @Get('slow')
  async slowEndpoint() {
    await new Promise((resolve) => setTimeout(resolve, 6000));
    return { done: true };
  }
}
