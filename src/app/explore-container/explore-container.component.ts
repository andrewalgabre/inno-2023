import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DailyTour } from '../model/daily-tour';
import { DialogFlowService } from '../services/dialog-flow.service';
import { IntentHandlerService } from '../services/intent-handler.service';
import { UgsService } from '../services/ugs-service';

let window: any;

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  @Input() name?: string;
  @Input() textAreaInput?: string;

  private window: any;

  private dailyTour: DailyTour;
  // private readonly  ugsService: UgsService;

  private SpeechRecognition;

  private SpeechGrammarList;
  private SpeechRecognitionEvent;

  speechResult = '';

  result;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly dialogflowService: DialogFlowService,
    private readonly intentHandlerService: IntentHandlerService,
    private readonly ugsService: UgsService,
    private readonly router: Router
  ) {
    this.window = this.document.defaultView;
    this.SpeechRecognition =
      this.window.SpeechRecognition || this.window.webkitSpeechRecognition;

    this.SpeechGrammarList =
      this.window.SpeechGrammarList || this.window.webkitSpeechGrammarList;

    this.SpeechRecognitionEvent =
      this.window.SpeechRecognitionEvent ||
      this.window.webkitSpeechRecognitionEvent;

    this.ugsService = ugsService;
  }

  startListening() {
    this.intentHandlerService.resetResult();
    const recognition = new this.SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', (e: any) => {
      console.log(e.result);

      this.textAreaInput = e.results[0][0].transcript;
    });

    recognition.addEventListener('end', async (e) => {
      this.sendMessageToDialogFlow();
      console.log(e);
    });
    recognition.start();
  }

  async sendMessageToDialogFlow() {
    var text = this.textAreaInput;
    console.log('Sending following text to dialog flow: ' + text);
    const result = await this.dialogflowService.detectIntent(text);
    this.result = result;

    this.intentHandlerService.setResult(result);
    this.intentHandlerService.handleResponseWithIntent(result);

    this.router.navigate(['/result']);
  }

  async clearMessage() {
    this.textAreaInput = '';
    var text = ' ';
    console.log('Sending following text to dialog flow: ' + text);
    const result = await this.dialogflowService.detectIntent(text);
    this.result = result;
    this.intentHandlerService.setResult(result);
    this.intentHandlerService.handleResponseWithIntent(result);

    this.router.navigate(['/result']);
  }

  processResult(result: any): void {
    console.log(
      'process intent: ' + result.params['wateramount']['numberValue']
    );
  }
}
