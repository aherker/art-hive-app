// src/app/services/firestore.service.ts
import { Injectable } from '@angular/core';
import { collection, addDoc, FieldValue, getDocs, updateDoc, doc, deleteDoc, getDoc, query, where} from "firebase/firestore";
import { db } from 'src/main';  // Import the Firestore instance


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private isUserAdmin = false;

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

  async addAdmin(userId: string){
    const adminsCollection = collection(db, 'Admins') //access the admins collection
    await addDoc(adminsCollection, {userId}) //adds the user to the admins collection
    console.log(`User ${userId} added to the admins collection.`);
  }

  //checks if the user is an admin
  async isAdmin(userId: string): Promise<boolean> {
    try {
      const adminsCollectionRef = collection(db, 'Admins');
      const querySnapshot = await getDocs(adminsCollectionRef);

      // Check if user is in the admin list
      for (const doc of querySnapshot.docs) {
        const adminData = doc.data();
        if (adminData['userId'] === userId) {
          this.isUserAdmin = true; // Update the property
          return true;
        }
      }

      this.isUserAdmin = false; // If not found, set to false
      return false;
    } catch (error) {
      console.error("Error checking if user is admin: ", error);
      this.isUserAdmin = false;
      return false;
    }
  }

  //Allows for admins to have special privleges on certain pages if true
  getAdminStatus(): Promise<boolean> {
    return Promise.resolve(this.isUserAdmin);
  }

  async getDocumentLength(collectionName: string, documentId: string): Promise<number> {
    try {
      const docRef = doc(db, collectionName, documentId); // Reference to the document
      const docSnapshot = await getDoc(docRef); // Fetch the document
      
      if (docSnapshot.exists()) {
        const data = docSnapshot.data(); // Get the document data
        return Object.keys(data).length; // Count the number of fields
      } else {
        console.error('Document does not exist!');
        return 0;
      }
    } catch (error) {
      console.error('Error fetching document length:', error);
      return 0;
    }
  }
}
