import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';

import { AuthenticationService } from '@services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  
    constructor(
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController,
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService,
      private router: Router
    ) { }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required, Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }
  
  async signUp(signupForm: FormGroup) {
    if (!signupForm.valid) {
       this.displayError('No se registró al usuario'); 
    } else {
      const { email, password } = signupForm.value;
      const loading = await this.loadingCtrl.create(
        {message: 'Registrando...'}
      );
      await loading.present();
      try {
        await this.authenticationService.register(email, password);
        console.log('registered user!');
        loading.dismiss();
        this.goToLogin();
      } catch(error) {
        console.log(error);
        loading.dismiss().then(() => {
          this.displayError('No se registró al usuario');
        });
      }
    }

  }

  async displayError(message) {
    const validationToast = await this.toastCtrl.create({
      showCloseButton: true,
      color: 'danger',
      closeButtonText: 'Cerrar',
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    validationToast.present();
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
