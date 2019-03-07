import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(public db: AngularFirestore) { 
    this.eventsCollection = db.collection<EventEk>('events');
    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(value => {
          const id = value.payload.doc.id;
          const data = value.payload.doc.data();
          return { id, ...data };
        });
      })
    )  
  }

  getEvents() {
    return this.events;
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
