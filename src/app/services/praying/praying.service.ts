import { Injectable } from '@angular/core';
import { Praying } from './praying.model';
import { Observable } from "rxjs";
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
 export interface Petition {
   name: string;
   petition: string;
   phone: string;
 }
@Injectable({
  providedIn: 'root'
})
export class PrayingService {
  private prayingNumberCollection: AngularFirestoreCollection<Praying>;
  private petitionCollection: AngularFirestoreCollection<Petition>;
  private prayingNumbers: Observable<Praying[]>;
  
  constructor(public db: AngularFirestore) {
    this.prayingNumberCollection = db.collection<Praying>('prayingNumbers');
    this.petitionCollection = db.collection<Petition>('prayings')
    
    this.prayingNumbers = this.prayingNumberCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getPrayingNumbers() {
    return this.prayingNumbers;
  }

  addPetition(petition) {
    return this.petitionCollection.add(petition);
  }
}
