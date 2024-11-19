import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss'],
})
export class AddQuestionModalComponent{

  questionLabel: string = ''; // Store the input

  constructor(private modalCtrl: ModalController) {}

  // On form submission
  addQuestion() {
    if (this.questionLabel) {
      this.modalCtrl.dismiss({ questionLabel: this.questionLabel });
    }
  }

  // Close the modal without saving
  cancel() {
    this.modalCtrl.dismiss(null);
  }
}
