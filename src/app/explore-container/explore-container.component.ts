import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {

  @Input() name?: string;
  @Input() textAreaInput?: string;

  constructor() {
  }
  
  sendMessageToDialogFlow(): void {
    var text = this.textAreaInput;
    console.log("Sending following text to dialog flow: " + text)
  }
  
}
