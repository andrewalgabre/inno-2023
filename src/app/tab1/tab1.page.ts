import { Component } from '@angular/core';
import { DialogFlowService, Locale } from '../services/dialog-flow.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private dialogFlowService: DialogFlowService) {
    this.dialogFlowService.detectIntent('dsadasdadasd', 'Hallo', Locale.de);
  }
}
