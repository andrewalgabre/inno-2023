import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class IntentHandlerService {
  constructor() {}

  handleIntent(result: any) {
    switch (intent) {
      case 'UFA_GALLO_READ_WATERLEVEL_LITER':
        break;
      case 'UFA_GALLO_READ_WATERLEVEL_LITER':
        break;
      default:
        break;
    }
  }
}
