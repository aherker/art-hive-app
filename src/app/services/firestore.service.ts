// src/app/services/firestore.service.ts
import { Injectable } from '@angular/core';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from 'src/main';  // Import the Firestore instance


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  // Add a new document
  async addDocument(collectionName: string, data: any) {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Get all documents from a collection
  async getDocuments(collectionName: string) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => doc.data());
  }

  // Update a document
  async updateDocument(collectionName: string, id: string, newData: any) {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, newData);
  }

  // Delete a document
  async deleteDocument(collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  }

  async getUserColor(userId: string): Promise<string> {
    try {
      const colorDocRef = doc(db, 'userColors', 'colorChoices');  // Reference to the 'colorChoices' document
      const docSnap = await getDoc(colorDocRef);  // Fetch the document

      if (docSnap.exists()) {
        const color = docSnap.data()?.[userId];  // Get the color for the userId
        if (color) {
          return color; // Return the user's color
        }
      }
      return '#000000'; // Return default color if user has no color set or document does not exist
    } catch (error) {
      console.error('Error fetching user color:', error);
      return '#000000';  // Return default color on error
    }
  }
}
