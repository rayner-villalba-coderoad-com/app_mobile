import { Injectable } from '@angular/core';
import { Preaching } from './preaching.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PreachingsService {
  private preachingsCollection: AngularFirestoreCollection<Preaching>; 
  private preachings: Observable<Preaching[]>;
  
  constructor(public db: AngularFirestore, private storage: Storage) {
    this.preachingsCollection = db.collection<Preaching>('teachings');
  }

  getPreachings(filters: BehaviorSubject<any>): Observable<any[]>  {
    return filters.pipe(
      switchMap(filter => {
        const startText = filter.value;
        const endText = startText + '\uf8ff';
      
        return this.db.collection('teachings',ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if(startText !== '') {
            query = query.orderBy('title').startAt(startText).endAt(endText);
          } else {
            query = query.orderBy('preachingId', 'desc');
          }
          return query;
        })
        .snapshotChanges().pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(actions => {
            return actions.map(value => {
              const id = value.payload.doc.id;
              const data = value.payload.doc.data();
              return { id, ...data };
            });
          })
        );
     })
    ); 
  }

  getPreaching(id) {
    return this.preachingsCollection.doc<Preaching>(id).valueChanges();
  }

  getSavedPreaching() {
    return this.storage.get('dpreachings');
  }

  saveData(preachings) {
    this.storage.set('dpreachings', preachings);
  }
}
