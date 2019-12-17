import { Component, OnInit } from '@angular/core';
import { AreasService } from "@services/areas/areas.service";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-area-detail',
  templateUrl: './area-detail.page.html',
  styleUrls: ['./area-detail.page.scss'],
})
export class AreaDetailPage implements OnInit {
  areaId: string;
  detail$: Observable<any>;

  constructor(
    private areasService: AreasService,
    private route: ActivatedRoute, 
    private callNumber: CallNumber,
    private iab: InAppBrowser) { }

  ngOnInit() {
    this.areaId = this.route.snapshot.params['areaId'];
    this.detail$ = this.areasService.getArea(this.areaId);
  }

  openLink(link) {
    this.iab.create(link, '_system'); 
  }

  call(contact) {
    this.callNumber.callNumber(contact, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
