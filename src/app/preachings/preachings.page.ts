import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { PreachingsService } from '@services/preachings/preachings.service';
import { Preaching } from '@services/preachings/preaching.model';

@Component({
  selector: 'app-preachings',
  templateUrl: './preachings.page.html',
  styleUrls: ['./preachings.page.scss'],
})
export class PreachingsPage implements OnInit {
  preachings: Preaching[];

  constructor(public socialSharing: SocialSharing, public loadingController: LoadingController, private preachingsService: PreachingsService, private router: Router,  private youtube: YoutubeVideoPlayer) { }

  ngOnInit() {
    this.getPreachings();
  }

  async getPreachings() {
    const preachingLoadingCtrl = await this.loadingController.create({
      message: 'Cargando...'
    });
    await preachingLoadingCtrl.present();

    this.preachingsService.getPreachings().subscribe(res => {
      this.preachings = res;
      preachingLoadingCtrl.dismiss();
    }, err => {
      console.log(err);
      preachingLoadingCtrl.dismiss();
    });
  }

  getPreachingDetails(preaching) {
    this.router.navigate(['tabs/preachings', preaching.id]);
  }

  openVideo(videoId) {
     this.youtube.openVideo(videoId);
  }

  share(preaching) {
    const { title, description } = preaching;
    const link = (preaching.videoLink !=='') ? preaching.videoLink : preaching.link;
    
    this.socialSharing.share(title, description, null, link).then(()=> {

    }).catch(error => {
      console.log(error);
    });
  }
}
