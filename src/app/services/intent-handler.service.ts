import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DialogflowResponse } from 'server/src/dialog-flow.service';
import { ChatService } from './chat.service';

@Injectable({ providedIn: 'root' })
export class IntentHandlerService {
  resultSubject$ = new BehaviorSubject<DialogflowResponse>(null);
  result$ = this.resultSubject$.asObservable();

  constructor(private readonly chatService: ChatService) {}

  handleIntent(result: DialogflowResponse) {
    debugger;
    switch (result.intent) {
      case 'UFA_GALLO_UPDATE_WATERLEVEL_LITER':
        // let title = result.params.
        debugger;
        const waterAmount = result.params['wateramount']['numberValue'];
        const herdeOptions = [
          {
            id: 1,
            name: 'Herde 1',
          },
          {
            id: 2,
            name: 'Herde 2',
          },
        ];
        const steps = [
          {
            title: `Bei Welcher Herde möchten Sie ${waterAmount}L abziehen?`,
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

  setResult(result: DialogflowResponse) {
    this.resultSubject$.next(result);
  }

  resetResult() {
    this.resultSubject$.next(null);
  }
}
