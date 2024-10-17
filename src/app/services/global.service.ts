import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private userId: string = 'NotLoggedIn';  // Global variable to store the Firebase UID

  // Setter for UID
  setUserId(uid: string) {
    this.userId = uid;
  }

  // Getter for UID
  getUserId(): string {
    return this.userId;
  }
}