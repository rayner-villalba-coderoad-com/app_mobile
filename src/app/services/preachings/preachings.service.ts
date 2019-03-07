import { Injectable } from '@angular/core';
import { Preaching } from './preaching.model';
import { Observable } from "rxjs";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreachingsService {
  private preachingsCollection: AngularFirestoreCollection<Preaching>; 
  private preachings: Observable<Preaching[]>;
  
  constructor(public db: AngularFirestore) {
    this.preachingsCollection = db.collection<Preaching>('teachings');
    this.preachings = this.preachingsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(value => {
          const id = value.payload.doc.id;
          const data = value.payload.doc.data();
          return { id, ...data };
        });
      })
    )
  }

  getPreachings() {
    return this.preachings;
  }

  getPreaching(id) {
    return this.preachingsCollection.doc<Preaching>(id).valueChanges();
  }
}
