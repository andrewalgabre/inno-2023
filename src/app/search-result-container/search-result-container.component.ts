import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { IntentHandlerService } from '../services/intent-handler.service';

@Component({
  selector: 'app-search-result',
  templateUrl: 'search-result-container.component.html',
})
export class SearchResultContainerComponent implements OnInit {
  result$ = this.intentHandlerService.result$;

  chat$ = this.chatService.currentChat$;

  constructor(
    private readonly intentHandlerService: IntentHandlerService,
    private readonly chatService: ChatService
  ) {}

  ngOnInit() {
    this.chatService.startChat();
  }
}
