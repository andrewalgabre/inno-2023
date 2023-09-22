import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DialogFlowService } from './dialog-flow.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DialogFlowService],
})
export class AppModule {}
