import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  map,
  switchMap,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';


export interface EventEk {
  id: string;
  name?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  place?: string;
  schedule?: string;
  eventDate?: string;
  link?: string;
  banner?: string;
  contact?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsCollection: AngularFirestoreCollection<EventEk>; 
  private events: Observable<EventEk[]>;

  constructor(public db: AngularFirestore, private database: AngularFireDatabase) { 
    this.eventsCollection = db.collection<EventEk>('events');
    this.events = this.eventsCollection.valueChanges();
  }

  getEvents(start: BehaviorSubject<string>): Observable<any[]> {
    return start.pipe(
      switchMap(startText => {
        const endText = startText + '\uf8ff';
        let query;
        if (startText !== '') {
          query = this.db.collection('events',ref => ref.orderBy('title').startAt(startText).endAt(endText));
        } else {
          query = this.db.collection('events',ref => ref.orderBy('eventDate', 'desc'));
        }
        return query.snapshotChanges().pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map((actions: any) => {
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

  getEvent(id) {
    return this.eventsCollection.doc<EventEk>(id).valueChanges();
  }

  updateEvent(event: EventEk, id: string) {
    return this.eventsCollection.doc(id).update(event);
  }

  addEvent(event: EventEk) {
    return this.eventsCollection.add(event);
  }

  removeEvent(id) {
    return this.eventsCollection.doc(id).delete();
  }
}
