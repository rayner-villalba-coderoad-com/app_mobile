import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage implements OnInit {
  areas: any[];
  constructor() { }

  ngOnInit() {
    this.areas = [{
      id: 1,
      banner: 'http://www.ekklesia.net/wp-content/uploads/2017/02/cem-1.jpg',
      title: 'Centro de Entrenamiento Ministerial'
    }, {
      id: 2,
      banner: 'http://www.ekklesia.net/wp-content/uploads/2017/02/logo-banners-REDES.jpg',
      title: 'Departamento de Ayuda Social'
    }, {
      id: 3,
      banner: 'http://www.ekklesia.net/wp-content/uploads/2017/02/logo-banners-clinic-1.jpg',
      title: 'Clínica el Buen Pastor'
    }, {
      id: 4,
      banner: 'http://www.ekklesia.net/wp-content/uploads/2017/02/logo-banners-evekk-1.jpg',
      title: 'EVEKK'
    }, {
      id: 5,
      banner: 'http://www.ekklesia.net/wp-content/uploads/2017/02/logo-banners-gress.jpg',
      title: 'GRESS'
    }, {
      id: 6,
      banner: 'http://3.bp.blogspot.com/-bqHhhil8Ttc/VZ7b8z86__I/AAAAAAAAa5E/7-PwJZJMVvQ/s1600/sistema_cristiano.jpg',
      title: 'Sistema Cristiano'
    }, {
      id: 7,
      banner: 'http://www.ekklesia.net/wp-content/uploads/2017/03/logo-banners-REDES.jpg',
      title: 'Librería Zamar'
    }];
  }
}
