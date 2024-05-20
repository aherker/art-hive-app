import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AnswerService } from '../services/answer.service';


@Component({
  selector: 'app-form-page3',
  templateUrl: './form-page3.page.html',
  styleUrls: ['./form-page3.page.scss'],
})
export class FormPage3Page implements OnInit {
  userAnswer: string = '';
  userAnswer2: string = '';
  savedAnswer: string = '';
  showAnswer: boolean = false;

  constructor(private storage: Storage, private answerService: AnswerService) {
    this.initStorage();
    this.userAnswer = this.answerService.getTemporaryAnswer();
  }

  

  ngOnInit() {
  }

  async initStorage() {
    await this.storage.create();
    const savedAnswer = await this.storage.get('userAnswer');
    if (savedAnswer) {
      this.savedAnswer = savedAnswer;
      this.showAnswer = true;
    }
  }

  async saveAnswer() {
    if (this.showAnswer) {
      await this.storage.set('userAnswer', this.userAnswer);
      this.userAnswer = '';
    }
  }

  submitAnswer() {
    if (this.userAnswer.trim() !== ''){
      this.savedAnswer = this.userAnswer
      this.showAnswer = true;
      this.answerService.setTemporaryAnswer(this.userAnswer);
      this.saveAnswer();
    } else {

    }
    // You can perform further actions with the user's answer here
  }

  updateTemporaryAnswer() {
    this.answerService.setTemporaryAnswer(this.userAnswer);
 
  }
}
