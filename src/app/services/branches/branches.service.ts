import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from "angularfire2/firestore";
import { Branch } from "@services/branches/branch.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  private branchesCollection: AngularFirestoreCollection<Branch>;
  private branches: Observable<Branch[]>;
 
  constructor(public db: AngularFirestore) {
    this.branchesCollection = this.db.collection<Branch>('branches', ref => ref.orderBy('branchId'));
  }

  getBranches() {
    return this.branchesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getBranch(id) {
    return this.branchesCollection.doc<Branch>(id).valueChanges();
  }
}
