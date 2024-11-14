// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class GlobalService {
//   private userId: string = 'NotLoggedIn';  // Global variable to store the Firebase UID

//   // Setter for UID
//   setUserId(uid: string) {
//     this.userId = uid;
//   }

//   // Getter for UID
//   getUserId(): string {
//     return this.userId;
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private userIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('NotLoggedIn');  // Initialize with default value
  public userId$: Observable<string> = this.userIdSubject.asObservable();  // Observable for external components to subscribe to

  // Setter for UID
  setUserId(uid: string) {
    this.userIdSubject.next(uid);  // Update the BehaviorSubject with the new UID
  }

  // Getter for UID (current value)
  getUserId(): string {
    return this.userIdSubject.value;
  }
}
