import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Import the functions you need from the SDKs you need for firebase
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import firebase from 'firebase/compat/app'; //importing firebase for auth services

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }



  recoverEmailPassword(email: string) : Observable<void>{
    return new Observable<void>(observer => {
      setTimeout(() => {
        if (email == "error@email.com"){
          observer.error({message: "Email not found"});
        }

        observer.next();
        observer.complete();
      }, 3000);
    })
  }

  login(email: string, password: string) : Observable<User>{
    return new Observable<User>(observer => {
      setTimeout(() => {
        if (email == "error@email.com"){
          observer.error({message: "User not found"});
          observer.next();
        }else{
          const user = new User();
          user.email = email;
          user.id = "userId";
          observer.next(user);


        }

        
        observer.complete();
      }, 3000);
    })
  }
}

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
