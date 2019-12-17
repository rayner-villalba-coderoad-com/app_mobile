import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { User } from './user.model'; // optional
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private facebook: Facebook, private googlePlus: GooglePlus, private platform: Platform) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  googleLogin() {
    if (this.isCordova()) {
      return this.nativeGoogleLogin();
    } else {
      const provider = new auth.GoogleAuthProvider();
      return this.authLogin(provider);
    }
  }
  
  private isCordova() {
    return this.platform.is('cordova');
  }

  private async nativeGoogleLogin() {
    try {
      const gPlusUser = await this.googlePlus.login({
        //'webClientId': 'AIzaSyBH0_gDCRogi6qKd6Sx6dguvblXlqQhI4U.apps.googleusercontent.com', // Only for android 
        'offline': true,
        'scopes': 'profile email'
      });

      return this.afAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(gPlusUser.idToken));
    } catch(error) {
      console.log(error);
    }
  }

  private socialSignInRedirect(provider)  {
    return this.afAuth.auth.signInWithRedirect(provider);
  }

   // Auth logic to run auth providers
  private authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  async register(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(result => {
      this.sendEmailVerification();
      this.setUserData(result.user);
    }).catch(error => {
      console.log(error);
    });
  }

  private setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(userData, {
      merge: true
    })
  }

  private sendEmailVerification() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  sendPasswordResetEmail(passwordResetEmail: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  //Social Provider logins
  facebookLogin(): Promise<any> {
    if(this.isCordova()) {
      return this.nativeFacebookLogin();
    } else {
      const provider = new auth.FacebookAuthProvider();
      return this.authLogin(provider);
    }
  }

  private async nativeFacebookLogin() {
    try {
      const facebookUser = await this.facebook.login(['public_profile', 'email']);
      const facebookCredential = auth.FacebookAuthProvider.credential(facebookUser.authResponse.accessToken);
      return this.afAuth.auth.signInWithCredential(facebookCredential);
    } catch(error) {
      console.log(error);
    }
  }

  logout() {
    return this.afAuth.auth.signOut();
  }  
}
