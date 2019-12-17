import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from "@ionic/angular";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PreachingsService } from '@services/preachings/preachings.service';

import { OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: 'app-preaching-details',
  templateUrl: './preaching-details.page.html',
  styleUrls: ['./preaching-details.page.scss'],
})
export class PreachingDetailsPage implements OnInit, OnDestroy {
  preaching$ : Observable<any>;
  preachingId = null;
  subscription: Subscription;

  constructor(public socialSharing: SocialSharing, private route: ActivatedRoute, private preachingsService: PreachingsService, private loadingController: LoadingController, public toastCtrl: ToastController) { }

  ngOnInit() {
    this.preachingId = this.route.snapshot.params['preachingId'];
     if (this.preachingId)  {
       this.loadPreaching();
     }
  }

  async loadPreaching() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
 
    this.preaching$ = this.preachingsService.getPreaching(this.preachingId);
    this.subscription = this.preaching$.subscribe(res => {
      loading.dismiss();
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }


  share(preaching) {
    const { title, description, link } = preaching;
    
    this.socialSharing.share(description, title, null, link).then(()=> {
      //this.displayMessage();
    }).catch(error => {
      console.log(error);
    });
  }

  async displayMessage() {
    const toast = await this.toastCtrl.create({
      showCloseButton: true,
      color: 'primary',
      closeButtonText: 'Cerrar',
      message: '¡Gracias por compartir esta Enseñanza!',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  async shareWhatsapp(preaching) {
    this.socialSharing.shareViaWhatsApp(preaching.description, preaching.banner, preaching.link).then(() => {
    }).catch(error => {
       console.log(error);
    });
  }

  async shareFacebook(preaching) {

  }

  async shareTwitter(preaching) {

  }

}
