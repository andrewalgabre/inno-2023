import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private readonly http: HttpClient) {}

  detectIntent(text: string) {
    return this.http.post(this.url + '/sendAnswer', { text });
  }
}
