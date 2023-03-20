import { Component, OnInit, NgModule } from '@angular/core';
import { AuthService } from '../_services/auth.service';

// For the "registered" message
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private toastController: ToastController) {
  }


  ngOnInit(): void {
  }

  onSubmit(): void {
    const {username, email, password} = this.form;

    this.authService.register(username, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: 'Account created successfully',
      duration: 1500,
      position: position
    });

    await toast.present();
  }
}
