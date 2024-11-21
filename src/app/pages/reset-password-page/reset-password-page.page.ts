import { Component } from '@angular/core';
import { sendPasswordResetEmail } from "firebase/auth";
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.page.html',
  styleUrls: ['./reset-password-page.page.scss'],
})
export class ResetPasswordPagePage{
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(private firestoreService: FirestoreService, private authenticationService: AuthenticationService, private navController: NavController) {}

  async resetPassword() {
    try {
      this.authenticationService.sendPasswordReset(this.email);
      this.message = 'Password reset email sent. Please check your inbox.';
      this.error = ''; // Clear error message if any

      this.navController.pop();
    } catch (err) {
      this.error = 'Failed to send password reset email. Please try again.';
      this.message = ''; // Clear success message if any
      console.error(err);
    }
  }

  cancel(){
    this.navController.pop();
  }

}
