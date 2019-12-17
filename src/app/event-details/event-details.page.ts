import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from "@ionic/angular";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { EventsService } from '@services/events/events.service';
import { OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { CallNumber } from "@ionic-native/call-number/ngx";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit, OnDestroy {
  eventEk$: Observable<any>;
  eventId = null;
  subscription: Subscription;
  
  constructor(
    public socialSharing: SocialSharing, 
    public toastCtrl: ToastController,
    private route: ActivatedRoute, 
    private eventsService: EventsService, 
    private callNumber: CallNumber,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['eventId'];
     if (this.eventId)  {
       this.loadEvent();
     }
  }

  async loadEvent() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
 
    this.eventEk$ = this.eventsService.getEvent(this.eventId);
    this.subscription = this.eventEk$.subscribe(res => {
      loading.dismiss();
    });
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  share(event) {
    const { title, description, link } = event;
    
    this.socialSharing.share(description, title, null, link).then(()=> {
      this.displayMessage();
    }).catch(error => {
      console.log(error);
    });
  }

  async displayMessage() {
    const toast = await this.toastCtrl.create({
      showCloseButton: true,
      color: 'primary',
      closeButtonText: 'Cerrar',
      message: '¡Gracias por compartir!',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
  
  call(contact) {
    this.callNumber.callNumber(contact, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
