import { Component } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
// export class AppComponent {
  export class HomePage implements OnInit {

    constructor(private firestoreService: FirestoreService) {}
  
    ngOnInit() {
      // Add a document to a collection
      this.firestoreService.addDocument('items', { name: 'Apple', quantity: 10 })
        .then(() => console.log('Document added!'))
        .catch(error => console.error('Error adding document:', error));
  
      // Get documents from a collection
      this.firestoreService.getDocuments('items')
        .then(docs => console.log('Documents:', docs))
        .catch(error => console.error('Error getting documents:', error));
    }
}
