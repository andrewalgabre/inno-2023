import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IntentHandlerService {
  constructor() {}

  handleIntent(intent: string) {
    switch (intent) {
      case 'INTENT':
        break;

      default:
        break;
    }
  }
}
