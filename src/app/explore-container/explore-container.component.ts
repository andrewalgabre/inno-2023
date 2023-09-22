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
    
    let p = document.createElement('p')
    const words = document.querySelector('.words')
    words?.appendChild(p);
    recognition.addEventListener('result', (e: any) => {
      console.log(e.result);

      const transcript: any = Array.from(e.results)
        .map(result => [0]) //result[0]
        //.map(result => result.transcript)
        //.join('')
      
      p.textContent = transcript;
      
      if(e.results[0].isFinal) {
        p = document.createElement('p');
        words?.appendChild(p);
      }
      
      console.log(transcript)
    });
    
    recognition.addEventListener('end', recognition.start);
    recognition.start();

    // addEventListener("audiostart", (event) => {});
    //
    // const audiostart = document.querySelector('ion-fab-button');
    //
    // recognition.addEventListener("audiostart", () => {
    //   console.log("Audio capturing started");
    // });
    
    
    
    
    

    
  }

  sendMessageToDialogFlow(): void {
    var text = this.textAreaInput;
    console.log("Sending following text to dialog flow: " + text)
  }


}


