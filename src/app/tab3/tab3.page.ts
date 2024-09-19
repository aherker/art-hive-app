import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private firestoreService: FirestoreService) {}

  // Example of adding a document
  async addFormResponse() {
    const formData = {
      name: "John Doe",
      email: "johndoe@example.com",
      message: "Hello, Firestore!",
      timestamp: new Date()
    };

    await this.firestoreService.addDocument(formData);
  }

  // Example of getting documents
  async getFormResponses() {
    const responses = await this.firestoreService.getDocuments();
    console.log(responses);
  }
}


