import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

export interface Ekkleunder {
  id: string;
  title?: string;
  path?: string;
  description: string;
  contact: string;
}

@Injectable({
  providedIn: 'root'
})
export class EkkleunderService {
  private ekkleunderCollection: AngularFirestoreCollection<Ekkleunder>;
  constructor(public db: AngularFirestore) {
    this.ekkleunderCollection = db.collection<Ekkleunder>('ekkleunder');
   }

  getEkkleunder(id) {
    return this.ekkleunderCollection.doc<Ekkleunder>(id).valueChanges();
  }
}
