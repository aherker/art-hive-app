import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  selectedItem: any;
  formResponses: any[] = []; 
  userId: string | null = null;
  selectedDocumentData: any;

  constructor(private firestoreService: FirestoreService, private globalService: GlobalService) {}

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

    await this.firestoreService.addDocument(this.globalService.getUserId(), formData);
  }

  // Example of getting documents
  async getFormResponses() {
    try {
      const responses = await this.firestoreService.getDocuments("formResponses");
      this.formResponses = responses;  // Store the fetched data
    } catch (error) {
      console.error('Error fetching form responses:', error);
    }
  }

  displayUID() {
    this.userId = this.globalService.getUserId(); // Get the UID from the global service
  }

  displaySelectedDocument() {
    if (this.selectedItem) {
      // Find the document matching the selected timestamp in formResponses
      this.selectedDocumentData = this.formResponses.find(doc =>
        doc['timestamp']?.toDate().getTime() === this.selectedItem.toDate().getTime()
      );
    } else {
      this.selectedDocumentData = null; // Clear selection if nothing is selected
    }
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  // Function to check if a value is an array
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

}


