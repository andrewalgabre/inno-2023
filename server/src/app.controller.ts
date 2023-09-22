import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DialogFlowService, Locale } from './dialog-flow.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dialogFlowService: DialogFlowService,
  ) {}

  @Get()
  getHello(): any {
    return this.dialogFlowService.detectIntent(
      '1',
      'Wassermenge 10 Liter erfassen',
      Locale.de,
    );
    // return this.appService.getHello();
  }
}
