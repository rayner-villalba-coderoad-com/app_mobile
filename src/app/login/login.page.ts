import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from '@services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  constructor(
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required, Validators.email
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });

  }

  async googleLogin() {
    try {
      await this.authenticationService.googleLogin();
      this.goToHome(); 
    } catch(error) {
      console.log(error);
      this.displayError('Usuario no válido');  
    }
  }

  async login(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
      this.displayError('Usuario no válido');  
    } else {
      const { email, password } = loginForm.value;
      const loading = await this.loadingCtrl.create(
        {message: 'Verificando...'}
      );
      await loading.present();
      try {
        await this.authenticationService.login(email, password);
        loading.dismiss();
        console.log('Valid user');
        this.goToHome();
      } catch(error) {
        console.log(error);
        loading.dismiss().then(() => {
          this.displayError('Usuario no válido');
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

  goToHome() {
    this.router.navigate(['']);
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: '¿Olvidaste tu Contraseña?',
      message: 'Ingresa tu Correo Electrónico para enviar el enlace del nuevo password.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo Electrónico'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: async (data) => {
            console.log(data);
            const loader: any = await this.loadingCtrl.create({
              message: 'Enviando...'
            });

            loader.present();
            await this.authenticationService.sendPasswordResetEmail(data.email)
            loader.dismiss().then(async () => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                color: 'success',
                closeButtonText: 'Cerrar',
                message: 'Correo electronico fue enviado',
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  facebookLogin() {
    this.authenticationService.facebookLogin().then(res => {
      console.log(res);
      this.goToHome();
    }).catch(error => {
      console.log(error);
    })
  }

  goToRegister() {
    this.router.navigate(['register'])
  }

}
