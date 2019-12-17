import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@services/authentication/authentication.service';
import { AlertController } from "@ionic/angular";

export interface Option {
  id: number;
  label: string;
  icon: string;
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
        icon: 'assets/info-circle-solid.svg',
        path: 'about'
      },
      {
        id: 2,
        label: 'Mis Notas',
        icon: 'assets/clipboard-list-solid.svg',
        path: 'notes'
      },
      {
        id: 3,
        label: 'Áreas',
        icon: 'assets/puzzle-piece-solid.svg',
        path: 'areas'
      },
      {
        id: 4,
        label: 'Perfil',
        icon: 'assets/user-circle-regular.svg',
        path: 'profile'
      },
      {
        id: 5,
        label: 'Enlaces',
        icon: 'assets/external-link-alt-solid.svg',
        path: 'links'
      },
      {
        id: 6,
        label: 'Wallpapers',
        icon: 'assets/images-regular.svg',
        path: 'wallpapers'
      }
    ];
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
    if (option.path === 'logout') {
      this.confirmLogout();
    } else {
      const url = `tabs/more/${option.path}`;
      this.router.navigateByUrl(url);
    }
  }
}
