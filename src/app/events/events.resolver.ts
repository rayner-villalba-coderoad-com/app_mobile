import { Injectable } from '@angular/core';
import { EventsService } from '@services/events/events.service';

import { Resolve } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EventsResolver implements Resolve<any> {
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');
  constructor(private eventsService: EventsService) { }

  resolve() {
    return new Promise((resolve, reject) => {
      resolve(this.eventsService.getEvents(this.startAt));
    });
  }
}
