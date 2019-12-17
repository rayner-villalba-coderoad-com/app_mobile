import { Component, ViewChild } from "@angular/core";
import { SwipeTabDirective } from '@directives/swipe-tab.directive';
import { IonTabs, Events } from "@ionic/angular";
import { OnInit } from "@angular/core";
import { Storage } from '@ionic/storage';
import { FcmService } from "@services/fcm/fcm.service";
import { Badge } from "@ionic-native/badge/ngx";
export interface Notification {
  ekklenews: number;
  teachings: number;
  notifications: Notification;
}

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})
export class TabsPage implements OnInit {
  @ViewChild(SwipeTabDirective) swipeTabDirective: SwipeTabDirective;
  @ViewChild("myTabs") tabRef: IonTabs;
  notification: any;
  constructor(
    private storage: Storage,
    public notifications: Events,
    private fcmService: FcmService,
    private badge: Badge) {
    this.notifications.subscribe('read-ekklenews', data => {
      this.discountNotification(data, 'events');
    });

    this.notifications.subscribe('read-preaching', data => {
      this.discountNotification(data, 'preachings');
    });

    this.notifications.subscribe('new-notification', data => {
      // console.log(data);
      const { section_id, section, section_type } = data;
      this.incrementNotification(section_id, section);
    });
  }

  async incrementNotification(id, section) {
    this.notification[section] += 1;
    this.notification.notifications[id] = id;
    this.fcmService.setNotificationsBadge(this.notification);
    await this.badge.increase(1);
  }

  async discountNotification(id, section) {
    if (this.notification.notifications[id] && this.notification[section] > 0) {
      this.notification[section] -= 1;
      delete this.notification.notifications[id];

      // TODO update localstorage
      this.fcmService.setNotificationsBadge(this.notification);
      await this.badge.decrease(1);
    }
  }

  ionTabsDidChange($event) {
    this.swipeTabDirective.onTabInitialized($event.tab);
  }

  ngOnInit() {
    this.loadNotificationsBadge();
  }

  loadNotificationsBadge() {
    this.storage.get('notifications').then(res => {
      if (res !== null) {
        this.notification = res;
      } else {
        this.notification = {
          events: 0,
          preachings: 0,
          notifications: {}
        };
      }
    });
     this.fcmService.setNotificationsBadge(this.notification);
  }

  onTabChange($event) {
    this.tabRef.select($event);
  }
}
