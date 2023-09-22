import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export class ChatService {
  chatStepsSubject$ = new BehaviorSubject<any>([]);
  currenChatSubject$ = new BehaviorSubject<any>(null);

  chatSteps$ = this.chatStepsSubject$.asObservable();
  currentChat$ = this.currenChatSubject$.asObservable();

  constructor() {}

  startChat() {
    debugger;
    const firstChat = this.chatStepsSubject$.getValue()[0];
    this.currenChatSubject$.next(firstChat);
  }

  addSteps(steps: any[]) {
    debugger;
    this.chatStepsSubject$.next(steps);
  }

  resetChat() {
    this.chatStepsSubject$.next([]);
  }
}
