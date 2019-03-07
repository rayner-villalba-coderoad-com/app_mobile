import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { User } from './user.model'; // optional
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private facebook: Facebook) {
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

  googleLogin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return this.socialSignInRedirect(provider);
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
    const provider = new auth.FacebookAuthProvider();
    return this.authLogin(provider);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }  
}
