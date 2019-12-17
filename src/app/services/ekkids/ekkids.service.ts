import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "angularfire2/firestore";

export interface Ekkids {
  id: string;
  title?: string;
  path?: string;
  description: string;
  contact: string;
}

@Injectable({
  providedIn: 'root'
})
export class EkkidsService {
  private ekkidsCollection: AngularFirestoreCollection<Ekkids>;
  constructor(public db: AngularFirestore) { 
    this.ekkidsCollection = db.collection<Ekkids>('ekkids');
  }

  getEkkids(id) {
    return this.ekkidsCollection.doc<Ekkids>(id).valueChanges();
  }
}
