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
    switch (result.intent) {
      case 'UFA_GALLO_UPDATE_WATERLEVEL_LITER':
        // let title = result.params.

        let waterAmount = result.params['waterAmount']['numberValue'];

        // const result =  this.ugsService.
        let herdeOptions = [
          {
            id: 1008,
            name: 'Amrock',
          },
          {
            id: 1013,
            name: 'Yokohama',
          },
        ];
        let steps = [
          {
            title: `Bei Welcher Herde möchten Sie ${waterAmount}L erfassen?`,
            options: herdeOptions,
          },
        ];

        this.chatService.addSteps(steps);
        break;
      case 'UFA_GALLO_UPDATE_FOOD':
        // let title = result.params.

        const food = result.params['amountFood']['numberValue'];

        // const result =  this.ugsService.
        const herdeOptionsFood = [
          {
            id: 1008,
            name: 'Amrock',
          },
          {
            id: 1013,
            name: 'Yokohama',
          },
        ];
        const stepsFood = [
          {
            title: `Bei Welcher Herde möchten Sie ${food}kg Futter erfassen?`,
            options: herdeOptionsFood,
          },
        ];

        this.chatService.addSteps(stepsFood);
        break;

      case 'UFA_GALLO_UPDATE_FOOD_AND_WATER':
        // let title = result.params.

        const food2 = result.params['amountFood']['numberValue'];
        let waterAmount2 = result.params['waterAmount']['numberValue'];
        debugger;
        // const result =  this.ugsService.
        const herdeOptionsFoodAndWater = [
          {
            id: 1008,
            name: 'Amrock',
          },
          {
            id: 1013,
            name: 'Yokohama',
          },
        ];
        const stepsFoodAndWater = [
          {
            title: `Bei Welcher Herde möchten Sie ${food2}kg Futter und ${waterAmount2} Liter Wasser erfassen?`,
            options: herdeOptionsFoodAndWater,
          },
        ];

        this.chatService.addSteps(stepsFoodAndWater);
        break;
      default:
        break;
    }
  }

  async handleAnswerWithIntent(flockId) {
    let response = this.resultSubject$.getValue();

    switch (response.intent) {
      case 'UFA_GALLO_UPDATE_WATERLEVEL_LITER':
        const waterAmount = response.params['waterAmount']['numberValue'];
        let dailyTour = new DailyTour();

        dailyTour.id = flockId;
        dailyTour.waterAmount = waterAmount;

        await this.ugsService.saveDailyTour(dailyTour);

        break;
      case 'UFA_GALLO_UPDATE_FOOD':
        const food = response.params['amountFood']['numberValue'];
        let dailyTourFood = new DailyTour();

        dailyTourFood.id = flockId;
        dailyTourFood.forageAmount = food;

        await this.ugsService.saveDailyTour(dailyTourFood);

        break;

      case 'UFA_GALLO_UPDATE_FOOD_AND_WATER':
        const food2 = response.params['amountFood']['numberValue'];
        let waterAmount2 = response.params['waterAmount']['numberValue'];

        dailyTourFood.id = flockId;
        dailyTourFood.forageAmount = food2;
        dailyTourFood.waterAmount = waterAmount2;

      // await this.ugsService.saveDailyTour(dailyTourFood);
    }
  }

  setResult(result: DialogflowResponse) {
    this.resultSubject$.next(result);
  }

  resetResult() {
    this.resultSubject$.next(null);
  }
}
