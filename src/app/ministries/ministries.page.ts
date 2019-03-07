import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ministries',
  templateUrl: './ministries.page.html',
  styleUrls: ['./ministries.page.scss'],
})
export class MinistriesPage implements OnInit {
  segments: string = 'jesusModel';
  networks: any[];
  modelImgURL: string;

  constructor() { }

  ngOnInit() {
    this.modelImgURL = '/assets/img/modelo.jpg';
    this.networks = [{
      id: 1,
      banner: '/assets/img/ninos.jpg',
      title: 'Red de Niños'
    }, {
      id: 2,
      banner: '/assets/img/juvemiles.jpg',
      title: 'Red de Juvemiles'
    }, {
      id: 3,
      banner: '/assets/img/jovenes.jpg',
      title: 'Red de Jovenes'
    }, {
      id: 4,
      banner: '/assets/img/jovenes-adultos.jpg',
      title: 'Red de Jovenes Adultos'
    }, {
      id: 5,
      banner: '/assets/img/profesionales.jpg',
      title: 'Red de Profesionales'
    }, {
      id: 6,
      banner: '/assets/img/matrimonio-joven.jpg',
      title: 'Red de Matromonios Jovenes'
    }, {
      id: 7,
      banner: '/assets/img/matrimonio.jpg',
      title: 'Red de Matromonios'
    }, {
      id: 8,
      banner: '/assets/img/musicos.jpg',
      title: 'Red de Músicos'
    }, {
      id: 9,
      banner: '/assets/img/carcelario.jpg',
      title: 'Red Carcelaria'
    }, {
      id: 10,
      banner: '/assets/img/sembradores-de-iglesia.jpg',
      title: 'Red de Sembradores de Iglesia'
    }, {
      id: 11,
      banner: '/assets/img/red-oro.jpg',
      title: 'Red de Oro'
    }
  ];
  }
}
