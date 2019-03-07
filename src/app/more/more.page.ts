import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@services/authentication/authentication.service';
import { AlertController } from "@ionic/angular";

export interface Option {
  id: number;
  label: string;
  banner: string;
  path: string;
}

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {
  options: Option[];

  constructor(private auth: AuthenticationService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.options = [
      {
        id: 1,
        label: 'Informaciones',
        banner: 'https://mw2.google.com/mw-panoramio/photos/medium/16804553.jpg',
        path: 'about'
      },
      {
        id: 2,
        label: 'Mis Notas',
        banner: 'https://www.faq-mac.com/wp-content/uploads/2016/02/Notas3-1132x670.jpg',
        path: 'notes'
      },
      {
        id: 3,
        label: 'Áreas',
        banner: 'https://bloximages.newyork1.vip.townnews.com/myhorrynews.com/content/tncms/assets/v3/editorial/a/4a/a4ae77fe-cfe5-11e3-9450-0017a43b2370/53601a60cbea0.image.jpg',
        path: 'areas'
      },
      {
        id: 4,
        label: 'Salir',
        banner: 'https://image.flaticon.com/icons/svg/58/58452.svg',
        path: 'logout'
      }
    ]
  }

  confirmLogout() {
    this.alertCtrl.create({
      header: 'Salir',
      message: '¿Deseas salir de la aplicación?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Si',
          handler: () => {
            this.logout();
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  async logout() {
    const out = await this.auth.logout();
    this.router.navigate(['/login']); 
  }

  goToOption(option) {
    console.log(option);
    if (option.path === 'logout') {
      this.confirmLogout();
    } else {
      const url = `tabs/more/${option.path}`;
      this.router.navigateByUrl(url);
    }
   
  }
}
