import { Injectable } from '@angular/core';
import { Profile } from "@services/profile/profile.model";
import { Storage } from '@ionic/storage';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "angularfire2/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileCollection: AngularFirestoreCollection<Profile>;
  
  constructor(public db: AngularFirestore, private storage: Storage) {
    this.profileCollection = this.db.collection<Profile>('profiles');
  }

  getProfile() {
    return this.storage.get('profile');
  }

  addProfile(profile: Profile, photoPath: string) {
    const id = this.db.createId();
    profile.id = id;
    profile.photoPath = photoPath;
    this.saveData(profile);
    return this.profileCollection.doc(id).set(profile);
  }

  updateProfile(profile: Profile, id: string, photoPath: string) {
    profile.id = id;
    profile.photoPath = photoPath;
    this.saveData(profile);
    return this.profileCollection.doc(id).update(profile);
  }

  saveData(profile) {
    this.storage.set('profile', profile);
  }
}
