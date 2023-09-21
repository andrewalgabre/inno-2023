import { Component, Inject, Input } from '@angular/core';
import { google } from "@google-cloud/dialogflow/build/protos/protos";
import { DOCUMENT } from "@angular/common";

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

  constructor(@Inject(DOCUMENT) private document: Document) {
    
    console.log(document);
    
    // @ts-ignore
    this.window = this.document.defaultView;
    
    //debugger;
    const SpeechRecognition = this.window.SpeechRecognition || this.window.webkitSpeechRecognition;
    const SpeechGrammarList = this.window.SpeechGrammarList || this.window.webkitSpeechGrammarList;
    const SpeechRecognitionEvent = this.window.SpeechRecognitionEvent || this.window.webkitSpeechRecognitionEvent;
    
    
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.start();



    let p = this.document.createElement('p');
    const words = document.querySelector('.words');
    // @ts-ignore
    //words.appendChild(p);

   
    recognition.addEventListener('results', (e: any) => {
      console.log(e);
    });

    
  }

  sendMessageToDialogFlow(): void {
    var text = this.textAreaInput;
    console.log("Sending following text to dialog flow: " + text)
  }


}


