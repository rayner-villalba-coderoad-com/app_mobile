import { Injectable } from '@angular/core';
import { Network } from "@services/networks/network.model";
import { Observable } from "rxjs";
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "angularfire2/firestore";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NetworksService {
  private networksCollection: AngularFirestoreCollection<Network>;
  private networks: Observable<Network[]>;
 
  constructor(public db: AngularFirestore) {
    this.networksCollection = this.db.collection<Network>('networks', ref => ref.orderBy('networkId'));
  }

  getNetworks() {
    return this.networksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getNetwork(id) {
    return this.networksCollection.doc<Network>(id).valueChanges();
  }
}
