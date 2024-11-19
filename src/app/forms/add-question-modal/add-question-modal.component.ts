import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.scss'],
})
export class AddQuestionModalComponent{

  questionForm: FormGroup;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    // Initialize the form
    this.questionForm = this.fb.group({
      questionLabel: ['', Validators.required], // Question text
    });
  }

  // On form submission
  addQuestion() {
    if (this.questionForm.valid) {
      // Pass data back to the parent component
      this.modalCtrl.dismiss(this.questionForm.value);
    }
  }

  // Close the modal without saving
  cancel() {
    this.modalCtrl.dismiss(null);
  }

}
