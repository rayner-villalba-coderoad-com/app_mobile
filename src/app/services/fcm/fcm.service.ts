import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  private topic: string = 'ekklesia';
  
  constructor(
    private fcm: FCM,
    private afs: AngularFirestore,
    private platform: Platform
  ) { }

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.fcm.getToken();
    }

    if (this.platform.is('ios')) {
      token = await this.fcm.getToken();
      //await this.fcm.grantPermission()
    }
    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');
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
}
