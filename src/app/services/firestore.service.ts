// src/app/services/firestore.service.ts
import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from 'src/main';  // Import the Firestore instance

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  // Add a new document
  async addDocument(data: any) {
    try {
      const docRef = await addDoc(collection(db, "formResponses"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Get all documents from a collection
  async getDocuments() {
    const querySnapshot = await getDocs(collection(db, "formResponses"));
    return querySnapshot.docs.map(doc => doc.data());
  }

  // Update a document
  async updateDocument(id: string, newData: any) {
    const docRef = doc(db, "formResponses", id);
    await updateDoc(docRef, newData);
  }

  // Delete a document
  async deleteDocument(id: string) {
    const docRef = doc(db, "formResponses", id);
    await deleteDoc(docRef);
  }
}
