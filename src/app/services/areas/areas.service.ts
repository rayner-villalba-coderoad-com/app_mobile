import { Injectable } from '@angular/core';
import { Area } from './area.model';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AreasService {
  private areaCollection: AngularFirestoreCollection<Area>;
  private networks: Observable<Area[]>;
 
  constructor(public db: AngularFirestore) {
    this.areaCollection = this.db.collection<Area>('areas');
  }

  getAreas() {
    return this.areaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getArea(id) {
    return this.areaCollection.doc<Area>(id).valueChanges();
  }
}
