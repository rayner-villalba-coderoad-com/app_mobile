import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from "@ionic/angular";
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PreachingsService } from '@services/preachings/preachings.service';

import { OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preaching-details',
  templateUrl: './preaching-details.page.html',
  styleUrls: ['./preaching-details.page.scss'],
})
export class PreachingDetailsPage implements OnInit, OnDestroy {
  preaching : any;
  preachingId = null;
  subscription: Subscription;

  constructor(public socialSharing: SocialSharing, private route: ActivatedRoute, private preachingsService: PreachingsService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.preachingId = this.route.snapshot.params['preachingId'];
    console.log(this.preachingId);
     if (this.preachingId)  {
       this.loadPreaching();
     }
  }

  async loadPreaching() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
 
    this.subscription = this.preachingsService.getPreaching(this.preachingId).subscribe(res => {
      loading.dismiss();
      this.preaching = res;
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  async shareWhatsapp(preaching) {
    this.socialSharing.shareViaWhatsApp(preaching.description, preaching.banner, preaching.link).then(() => {
      console.log('Exitos');
    }).catch(error => {
       console.log(error);
    });
  }

  async shareFacebook(preaching) {

  }

  async shareTwitter(preaching) {

  }

}
