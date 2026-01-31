import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return {
      message: 'Welcome to NestJS API',
      version: '1.0.0',
      api: '/api/v1',
      documentation: {
        health: '/api/v1/health',
        status: '/api/v1/health/status',
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health/status')
  getStatus() {
    return {
      status: 'ok',
      message: 'Backend API is running',
      timestamp: new Date().toISOString(),
    };
  }
}
