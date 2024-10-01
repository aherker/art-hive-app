import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  formResponses: any[] = []; 

  constructor(private firestoreService: FirestoreService) {}

  async ngOnInit() {
    await this.getFormResponses(); // Fetch the data when the page loads
  }

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
    try {
      const responses = await this.firestoreService.getDocuments();
      this.formResponses = responses;  // Store the fetched data
    } catch (error) {
      console.error('Error fetching form responses:', error);
    }
  }
}


