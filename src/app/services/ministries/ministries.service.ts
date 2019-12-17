import { Injectable } from '@angular/core';
import { Ministry } from './ministry.model';
import { Observable } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore } from "angularfire2/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MinistriesService {
  private ministriesCollection: AngularFirestoreCollection<Ministry>;
  private ministries: Observable<Ministry[]>;
 
  constructor(public db: AngularFirestore) {
    this.ministriesCollection = db.collection<Ministry>('ministries', ref => ref.orderBy('ministryId'));
    this.ministries = this.ministriesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMinistries() {
    return this.ministries;
  }

  getMinistry(id) {
    return this.ministriesCollection.doc<Ministry>(id).valueChanges();
  }

}
