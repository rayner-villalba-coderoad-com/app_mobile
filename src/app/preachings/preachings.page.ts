import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { NgZone } from '@angular/core';
import {
  LoadingController,
  ToastController,
  Platform,
  Events
} from "@ionic/angular";
import { Router } from '@angular/router';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { PreachingsService } from '@services/preachings/preachings.service';
import { Preaching } from '@services/preachings/preaching.model';
import { Observable, BehaviorSubject } from "rxjs";
import {
  StreamingMedia,
  StreamingAudioOptions
} from "@ionic-native/streaming-media/ngx";

import {
  FileTransfer,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-preachings',
  templateUrl: './preachings.page.html',
  styleUrls: ['./preachings.page.scss'],
})
export class PreachingsPage implements OnInit {
  displaySearch: boolean;
  preachings: Preaching[]; 
  preachingsCopy: Preaching[]; 
  preachings$: Observable<Preaching[]>;
  private filter;
  startAt: BehaviorSubject<any | null>;
  segments: string = 'video';
  searching: boolean = true;
  progress: String;
  porcentage: number;
  savedPreachings = {};
  private fileTransfer: FileTransferObject;
  constructor(
    private transfer: FileTransfer,
    private file: File,
    public socialSharing: SocialSharing, 
    public loadingController: LoadingController, 
    private preachingsService: PreachingsService, 
    private router: Router, 
    private platform: Platform,
    private youtube: YoutubeVideoPlayer,
    private streamingMedia: StreamingMedia,
    public toastCtrl: ToastController,
    public readPreaching: Events,
    public _zone: NgZone
    ) {
      this.filter = {
        value: '',
        type: ''
      };

      this.startAt = new BehaviorSubject(this.filter);
  }

  ngOnInit() {
    this.displaySearch = false;
    this.preachings$ = this.preachingsService.getPreachings(this.startAt);
    this.preachings$.subscribe((response) => {
      this.preachingsCopy = response;
      this.preachings = this.getList(this.preachingsCopy, this.segments);
      this.searching = false;
    });

    this.getSavedPreachings();
  }

  getSavedPreachings() {
    this.preachingsService.getSavedPreaching().then(res => {
      if (res !== null) {
      this.savedPreachings = res;
      }
    }, error => {
      console.log(error);
      this.savedPreachings = {};
    });
  }

  getList(list, type) {
    const downloadPreachings = this.savedPreachings;
    return list.filter(value => {
      const { id } = value;
      value.fallbackUrl = '/assets/img/ecast.jpg';
      if (downloadPreachings[id]) {
        const { link } = downloadPreachings[id];
        value.link = link;
      }

      return value.type === type;
    });
  }

  search() {
    this.displaySearch = true;
    this.filter.value = '';
  }

  cancelSearch() {
    this.displaySearch = false;
    this.filter.value = '';
    this.startAt.next(this.filter);
  }

  segmentChanged(event: any) {
    this.preachings = this.getList(this.preachingsCopy, event.detail.value);
  }

  filterPreachings(value) {
    this.searching = true;
    this.filter.value = value;
    this.startAt.next(this.filter);
  }

  getPreachingDetails(preaching) {
    this.readPreaching.publish('read-preaching', preaching.id);
    switch (preaching.type) {
      case 'read':
        this.router.navigate(['tabs/preachings', preaching.id]);
        break;
      case 'video':
        this.playVideo(preaching);
        break;
      case 'audio':
        this.playAudio(preaching);
        break;
    }
  }

  goPreachingDetail(preaching) {
    const {id} = preaching;
    this.router.navigate(['tabs/preachings', id]);
  }

  async playAudio(preaching) {
    if (preaching.progress > 0 && preaching.progress < 100) {
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    const audioOptions: StreamingAudioOptions = {
      successCallback: () => {},
      errorCallback: (error) => { console.log(error); },
      bgImage: preaching.ecastBanner,
      bgImageScale: 'fit',
      initFullscreen: false,
      keepAwake: true
    };

    this.streamingMedia.playAudio(preaching.link, audioOptions);
    loading.dismiss();
  }

  downloadAudio(preaching) {
    let path = null;
    preaching.progress = 1;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    } else {
      path = this.file.externalRootDirectory;
    }
    const URL = preaching.link;
    const fileUrl = URL.substr(URL.lastIndexOf('/') + 1);
    const [ fileName ] = fileUrl.split('?');

    this.fileTransfer = this.transfer.create();

    this.fileTransfer.download(URL, path + fileName).then(entry => {
      const { id } = preaching;
      this.displayMessage('¡Tu descarga ha terminado exitósamente!');
      preaching.link = entry.toURL();
      this.savedPreachings[id + ''] = preaching;
      this.preachingsService.saveData(this.savedPreachings);
      this.playAudio(preaching);
    }, async (error) => {
      console.log('download failed: ' + error);
      preaching.progress = 0;
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          color: 'danger',
          closeButtonText: 'Cerrar',
          message: '¡No se pudo completar tu descarga!',
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
    });

    this.fileTransfer.onProgress((progressEvent) => {
      this._zone.run(() => {
        const perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
        preaching.progress = perc;
      });
    });
  }

  playVideo(preaching) {
    const {link} = preaching;
    const splitedLink = link.split('=');
    const videoId = splitedLink[1];
    this.youtube.openVideo(videoId);
  }

  share(preaching) {
    const { title, description, link } = preaching;

    this.socialSharing.share(description, title, null, link).then(()=> {
      this.displayMessage('¡Gracias por compartir esta Enseñanza!');
    }).catch(error => {
      console.log(error);
    });
  }

  async displayMessage(message) {
    const toast = await this.toastCtrl.create({
      showCloseButton: true,
      color: 'primary',
      closeButtonText: 'Cerrar',
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  canDownload(preaching) {
    return !preaching.progress && !this.savedPreachings[preaching.id];
  }
}
