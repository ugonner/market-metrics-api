import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetricsModule } from './metrics/metrics.module';
import { ConfigModule } from '@nestjs/config';

let mongod;

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
