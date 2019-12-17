import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Badge } from '@ionic-native/badge/ngx';

import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import {
  FileTransfer,
  FileTransferObject
} from "@ionic-native/file-transfer/ngx";
import { File } from '@ionic-native/file/ngx';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '@env/environment';

import { IonicImageLoader } from 'ionic-image-loader';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Calendar } from '@ionic-native/calendar/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__ekklesia',
      driverOrder: ['sqlite', 'websql']
    }),
    IonicImageLoader.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    YoutubeVideoPlayer,
    StreamingMedia,
    FCM,
    InAppBrowser,
    AngularFireDatabase,
    Badge,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    Calendar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    WebView
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
