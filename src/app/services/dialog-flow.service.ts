import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { IntentHandlerService } from './intent-handler.service';
// Imports the Dialogflow library
export enum Locale {
  'de' = 'de-CH',
  'en' = 'en-EU',
  'fr' = 'fr-CH',
  'it' = 'it-CH',
}

export interface DialogflowResponse {
  intent: string;
  queryText: string;
  params: any;
}

@Injectable({ providedIn: 'root' })
export class DialogFlowService {
  url = 'http://localhost:3000';

  constructor(
    private readonly http: HttpClient,
    private intentHandlerService: IntentHandlerService
  ) {}

  async detectIntent(text: string): Promise<DialogflowResponse> {
    const result = await lastValueFrom(
      this.http.post<DialogflowResponse>(this.url + '/sendAnswer', { text })
    );

    this.intentHandlerService.setResult(result);
    return result;
  }
}
