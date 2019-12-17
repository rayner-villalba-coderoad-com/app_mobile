import { Component, ViewChildren, QueryList } from "@angular/core";

import {
  Platform,
  ToastController,
  Events,
  IonRouterOutlet,
  ModalController,
  AlertController
} from "@ionic/angular";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from '@services/fcm/fcm.service';
import { Router } from '@angular/router';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showSplash = true;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private fcm: FcmService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public newNotification: Events,
    public toastController: ToastController,
    public modalCtrl: ModalController,
    public alertController: AlertController,
    private youtube: YoutubeVideoPlayer,
    private streamingMedia: StreamingMedia,
  ) {
    this.initializeApp();
    this.backButtonEvent();
    this.componentWillLoad();
  }

  componentWillLoad() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.enableDarkTheme(prefersDark.matches);
  }

  enableDarkTheme(isEnable) {
    document.body.classList.toggle('dark', isEnable);
  }

  backButtonEvent() {
    document.addEventListener("backbutton", async () => { 
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
            element.dismiss();
            return;
        }
      } catch (error) {
        console.log(error);
      }
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (this.router.url === '/tabs/events' || 
        this.router.url === '/tabs/preachings' ||
        this.router.url === '/tabs/weare' || 
        this.router.url === '/tabs/praying'||
        this.router.url === '/tabs/more') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            this.presentAlertConfirm();
          } 
          else {       
          this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '¿Quieres salir de la aplicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Salir',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.onSubscribeToTopic();
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      data => {
        // this.newNotification.publish('new-notification', data);
        if (data.wasTapped) {
          // this.presentToast('Received in background');
          switch (data.section_type) {
            case 'read':
              this.router.navigate([`tabs/${data.section}`, data.section_id]);
              break;
            case 'video':
              this.router.navigate([`tabs/${data.section}`]);
              this.playVideo(data);
              break;
            case 'audio':
              this.router.navigate([`tabs/${data.section}`]);
              this.playAudio(data);
              break;
          }

          // landing_page should be events or preachings and its Ii
          // 'tabs/events' or 'tabs/preachings'
          // this.router.navigate([`tabs/${data.section}`, data.section_id]);
        } else {
          this.newNotification.publish('new-notification', data);
          // this.presentToast('Received in foreground');
          // this.router.navigate([`tabs/${data.section}`, data.section_id]);
        }
      }
    );
    this.fcm.onTokenRefresh();
  }

  playAudio(data) {
    const { section_link } = data;
    const audioOptions: StreamingAudioOptions = {
      successCallback: () => { },
      errorCallback: (error) => { console.log(error); },
      bgImage: data.image,
      bgImageScale: 'fit',
      initFullscreen: false,
      keepAwake: true
    };

    this.streamingMedia.playAudio(section_link, audioOptions);
  }

  playVideo(data) {
    const { section_link } = data;
    const splitedLink = section_link.split('=');
    const videoId = splitedLink[1];
    this.youtube.openVideo(videoId);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.notificationSetup();
    });
  }
}
