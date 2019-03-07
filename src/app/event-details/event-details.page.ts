import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { EventsService } from '@services/events/events.service';
import { OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit, OnDestroy {
  eventEk : any;
  eventId = null;
  subscription: Subscription;
  
  constructor(public socialSharing: SocialSharing, private route: ActivatedRoute, private eventsService: EventsService, private loadingController: LoadingController) {

   }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['eventId'];
    console.log(this.eventId);
     if (this.eventId)  {
       this.loadEvent();
     }
  }

  async loadEvent() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
 
    this.subscription = this.eventsService.getEvent(this.eventId).subscribe(res => {
      loading.dismiss();
      this.eventEk = res;
    });
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  async shareWhatsapp(eventEk) {console.log(eventEk);
    this.socialSharing.shareViaWhatsApp(eventEk.description, eventEk.banner, eventEk.link).then(() => {
      console.log('Exitos');
    }).catch(error => {
       console.log(error);
    });
  }

  async shareFacebook(eventEk) {

  }

  async shareTwitter(eventEk) {

  }
}
