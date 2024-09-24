import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import the functions you need from the SDKs you need for firebase
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import firebase from 'firebase/compat/app'; //importing firebase for auth services
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Import the AngularFireStorage class
import { Firestore, collection, addDoc, getDocs, doc, setDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class FirestoreService {

  constructor(private firestore: Firestore) { }

  // Example: Add a new document to a Firestore collection
  addDocument(collectionName: string, data: any) {
    const collectionRef = collection(this.firestore, collectionName);
    return addDoc(collectionRef, data);
  }

  // Example: Get all documents from a Firestore collection
  async getDocuments(collectionName: string) {
    const collectionRef = collection(this.firestore, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map(doc => doc.data());
  }

  // Example: Set a document with a specific ID
  setDocument(collectionName: string, docId: string, data: any) {
    const docRef = doc(this.firestore, `${collectionName}/${docId}`);
    return setDoc(docRef, data);
  }
}
// export class AuthService {

//   constructor(private afAuth: AngularFireAuth) { }
//   recoverEmailPassword(email: string) : Observable<void>{
//     return new Observable<void>(observer => {
//       setTimeout(() => {
//         if (email == "error@email.com"){
//           observer.error({message: "Email not found"});
//         }

//         observer.next();
//         observer.complete();
//       }, 3000);
//     })
//   }

//   login(email: string, password: string) : Observable<User>{
//     return new Observable<User>(observer => {
//       setTimeout(() => {
//         if (email == "error@email.com"){
//           observer.error({message: "User not found"});
//           observer.next();
//         }else{
//           const user = new User();
//           user.email = email;
//           user.id = "userId";
//           observer.next(user);


//         }

        
//         observer.complete();
//       }, 3000);
//     })
//   }
// }

// export class StorageService {
//   constructor(private storage: AngularFireStorage) {}

//   uploadFile(file: File): Observable<string> {
//     const filePath = `uploads/${new Date().getTime()}_${file.name}`;
//     const fileRef = this.storage.ref(filePath);
//     const task = this.storage.upload(filePath, file);

//     return new Observable((observer) => {
//       task.snapshotChanges()
//         .pipe(
//           finalize(() => {
//             fileRef.getDownloadURL().subscribe((url) => {
//               observer.next(url);
//               observer.complete();
//             });
//           })
//         )
//         .subscribe();
//     });
//   }
// }

  // Login with email and password
//   login(email: string, password: string): Observable<firebase.User | null> {
//     return new Observable(observer => {
//       this.afAuth.signInWithEmailAndPassword(email, password)
//         .then(userCredential => {
//           observer.next(userCredential.user);
//           observer.complete();
//         })
//         .catch(error => observer.error(error));
//     });
//   }

//   // Register new user
//   register(email: string, password: string): Observable<firebase.User | null> {
//     return new Observable(observer => {
//       this.afAuth.createUserWithEmailAndPassword(email, password)
//         .then(userCredential => {
//           observer.next(userCredential.user);
//           observer.complete();
//         })
//         .catch(error => observer.error(error));
//     });
//   }

//   // Password recovery
//   recoverEmailPassword(email: string): Observable<void> {
//     return new Observable(observer => {
//       this.afAuth.sendPasswordResetEmail(email)
//         .then(() => {
//           observer.next();
//           observer.complete();
//         })
//         .catch(error => observer.error(error));
//     });
//   }

//   // Logout
//   logout(): Observable<void> {
//     return new Observable(observer => {
//       this.afAuth.signOut()
//         .then(() => {
//           observer.next();
//           observer.complete();
//         })
//         .catch(error => observer.error(error));
//     });
//   }

//   // Get currently logged in user
//   getCurrentUser(): Observable<firebase.User | null> {
//     return this.afAuth.authState;
//   }
// }
