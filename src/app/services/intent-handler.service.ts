import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DialogflowResponse } from 'server/src/dialog-flow.service';
import { DailyTour } from '../model/daily-tour';
import { ChatService } from './chat.service';
import { UgsService } from './ugs-service';

@Injectable({ providedIn: 'root' })
export class IntentHandlerService {
  resultSubject$ = new BehaviorSubject<DialogflowResponse>(null);
  result$ = this.resultSubject$.asObservable();

  constructor(
    private readonly chatService: ChatService,
    private readonly ugsService: UgsService
  ) {}

  async handleResponseWithIntent(result: DialogflowResponse) {
    debugger;
    switch (result.intent) {
      case 'UFA_GALLO_UPDATE_WATERLEVEL_LITER':
        // let title = result.params.
        debugger;
        const waterAmount = result.params['wateramount']['numberValue'];

        // const result =  this.ugsService.
        const herdeOptions = [
          {
            id: 1008,
            name: 'Amrock',
          },
          {
            id: 1013,
            name: 'Yokohama',
          },
        ];
        const steps = [
          {
            title: `Bei Welcher Herde möchten Sie ${waterAmount}L erfassen?`,
            options: herdeOptions,
          },
        ];

        this.chatService.addSteps(steps);
        break;
      case 'UFA_GALLO_READ_WATERLEVEL_LITER':
        break;
      default:
        break;
    }
  }

  async handleAnswerWithIntent(flockId) {
    let response = this.resultSubject$.getValue();

    switch (response.intent) {
      case 'UFA_GALLO_UPDATE_WATERLEVEL_LITER':
        debugger;
        const waterAmount = response.params['wateramount']['numberValue'];
        let dailyTour = new DailyTour();

        dailyTour.id = flockId;
        dailyTour.waterAmount = waterAmount;

        await this.ugsService.saveDailyTour(dailyTour);
        break;
    }
  }

  setResult(result: DialogflowResponse) {
    this.resultSubject$.next(result);
  }

  resetResult() {
    this.resultSubject$.next(null);
  }
}
