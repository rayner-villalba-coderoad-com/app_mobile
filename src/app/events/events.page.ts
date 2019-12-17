import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController, ToastController, Events, Platform } from "@ionic/angular";
import { Router, ActivatedRoute } from '@angular/router';

import { EventsService } from '@services/events/events.service';
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { YoutubeVideoPlayer } from "@ionic-native/youtube-video-player/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { Calendar } from '@ionic-native/calendar/ngx';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit{
  displaySearch: boolean;
  events$: Observable<any[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');
  subscription: Subscription;
  calendars = [];

  constructor(
    public loadingController: LoadingController,
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute,
    public toastCtrl: ToastController,
    private youtube: YoutubeVideoPlayer,
    public socialSharing: SocialSharing,
    public readNotifications: Events,
    private calendar: Calendar,
    private plt: Platform) {
      // this.plt.ready().then(() => {
      //   this.calendar.listCalendars().then(data => {
      //     this.calendars = data;
      //   });
      // });
    }

  ngOnInit() {
    this.displaySearch = false;
    this.loadEvents();
  }

  async loadEvents() {
    const promiseObservable = this.route.data;
    promiseObservable.subscribe(promiseValue => {
      const { data } = promiseValue;
      this.events$ = data;
    });
    // const loading = await this.loadingController.create({
    //   message: 'Cargando...'
    // });
    // await loading.present();
    // this.events$ = this.eventsService.getEvents(this.startAt);
    // this.events$.subscribe(res => {
    //   loading.dismiss();
    // }, error => {
    //   loading.dismiss();
    // });
  }

  getEventDetails(event) {
    this.readNotifications.publish('read-ekklenews', event.id);
    this.cancelSearch();
    if (event.type === 'read') {
      this.router.navigate(['tabs/events', event.id]);
    } else {
      this.playVideo(event);
    }
  }

  search() {
    this.displaySearch = true;
  }

  cancelSearch() {
    this.displaySearch = false;
    this.startAt.next('');
  }

  filterEvents(value) {
    this.startAt.next(value);
  }

  playVideo(event) {
    const {link} = event;
    const splitedLink = link.split('=');
    const videoId = splitedLink[1];
    this.youtube.openVideo(videoId);
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

  addToCalendar(event) {
    console.log(event);
    const { seconds } = event.eventDate;
    const date = new Date(seconds * 1000);
    const options = { url: event.link, firstReminderMinutes: 15 };
    const location = event.location || 'Casa de la Casa';

    this.calendar.createEventInteractivelyWithOptions(event.title, location, event.subtitle, date, date, options).then( async (res) => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        color: 'primary',
        closeButtonText: 'Cerrar',
        message: '¡Se agregó este evento en su calendario!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }, err => {
      console.log('err: ', err);
    });
  }
}
