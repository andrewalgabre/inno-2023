import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DialogFlowService, Locale } from './dialog-flow.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dialogFlowService: DialogFlowService,
  ) {}

  @Post('sendAnswer')
  getHello(@Body() body: { text: string; locale: Locale }): any {
    if (!body?.text) throw Error('no search terms passed');

    const locale = body?.locale || 'de';
    const sessionId = 'innodays2023';
    return this.dialogFlowService.detectIntent(sessionId, body.text, Locale.de);
  }
}
