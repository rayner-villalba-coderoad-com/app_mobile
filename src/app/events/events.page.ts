import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { EventsService } from '@services/events/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  events: any[];

  constructor(public loadingController: LoadingController, private eventsService: EventsService, private router: Router) { }

  ngOnInit() {
    this.getEvents();
  }

  async getEvents() {
    const eventsLoadingCtrl = await this.loadingController.create({
      message: 'Cargando...'
    });
    await eventsLoadingCtrl.present();

    this.eventsService.getEvents().subscribe(res => {
      this.events = res;
      eventsLoadingCtrl.dismiss();
    }, err => {
      console.log(err);
      eventsLoadingCtrl.dismiss();
    });
  }

  getEventDetails(event) {
    this.router.navigate(['tabs/ekklenews', event.id]);
  }
}
