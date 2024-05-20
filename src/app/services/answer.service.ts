// answer.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private temporaryAnswer: string = '';

  constructor() {}

  setTemporaryAnswer(answer: string) {
    this.temporaryAnswer = answer;
  }

  getTemporaryAnswer() {
    return this.temporaryAnswer;
  }
}
