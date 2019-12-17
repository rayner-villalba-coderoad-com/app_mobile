import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  private topic: string = 'ekklesia';
  
  constructor(
    private fcm: FCM,
    private afs: AngularFirestore,
    private platform: Platform,
    private storage: Storage
  ) { }

  async getToken() {
    let token;

    if (this.platform.is('cordova')) {
      token = await this.fcm.getToken();
      console.log(token);
    }

    // if (this.platform.is('ios')) {
    //   token = await this.fcm.getToken();
    //   //await this.fcm.grantPermission()
    // }
    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices2');
    const data = {
      token,
      userId: 'userId'
    };

    return devicesRef.doc(token).set(data);
  }

  onNotifications() {
    return this.fcm.onNotification();
  }

  onTokenRefresh() {
    return this.fcm.onTokenRefresh();
  }

  onSubscribeToTopic() {
    this.fcm.subscribeToTopic(this.topic);
  }

  getNotificationsBadge() {
    return this.storage.get('notifications');
  }

  setNotificationsBadge(notifications) {
    this.storage.set('notifications', notifications);
  }
}
