import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { IntentHandlerService } from '../services/intent-handler.service';

@Component({
  selector: 'app-search-result',
  templateUrl: 'search-result-container.component.html',
})
export class SearchResultContainerComponent implements OnInit {
  result$ = this.intentHandlerService.result$;

  chat$ = this.chatService.currentChat$;

  public alertButtons = ['OK'];
  alertOpen = false;

  constructor(
    private readonly intentHandlerService: IntentHandlerService,
    private readonly chatService: ChatService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.chatService.startChat();
  }

  async handleAnswer(flockId: number) {
    let intent = this.intentHandlerService.resultSubject$.getValue().intent;
    await this.intentHandlerService.handleAnswerWithIntent(flockId);
    this.alertOpen = true;
  }

  navigateBack() {
    this.alertOpen = false;
    this.intentHandlerService.resetResult();
    this.router.navigate(['/']);
  }
}
