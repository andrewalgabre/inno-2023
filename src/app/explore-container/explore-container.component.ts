import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { DialogFlowService } from '../services/dialog-flow.service';

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

  private SpeechRecognition;

  private SpeechGrammarList;
  private SpeechRecognitionEvent;

  speechResult = '';

  result;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly dialogflowService: DialogFlowService
  ) {
    this.window = this.document.defaultView;
    this.SpeechRecognition =
      this.window.SpeechRecognition || this.window.webkitSpeechRecognition;

    this.SpeechGrammarList =
      this.window.SpeechGrammarList || this.window.webkitSpeechGrammarList;

    this.SpeechRecognitionEvent =
      this.window.SpeechRecognitionEvent ||
      this.window.webkitSpeechRecognitionEvent;
  }

  startListening() {
    this.speechResult = '';
    const recognition = new this.SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', (e: any) => {
      console.log(e.result);

      this.speechResult = e.results[0][0].transcript;
      const transcript: any = Array.from(e.results).map((result) => [0]); //result[0]
      //.map(result => result.transcript)
      //.join('')
      console.log(transcript);
    });

    // recognition.addEventListener('end', recognition.start);
    recognition.start();
  }

  sendMessageToDialogFlow(): void {
    var text = this.textAreaInput;
    console.log('Sending following text to dialog flow: ' + text);
    this.dialogflowService.detectIntent(text).subscribe((result) => {
      this.result = result;
    });
  }
}
