import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { NetworksService } from '@services/networks/networks.service';
import { MinistriesService } from '@services/ministries/ministries.service';
import { CallNumber } from "@ionic-native/call-number/ngx";
import { EkkleunderService } from "@services/ekkleunder/ekkleunder.service";
import { EkkidsService } from "@services/ekkids/ekkids.service";

@Component({
  selector: 'app-weare-information',
  templateUrl: './weare-information.page.html',
  styleUrls: ['./weare-information.page.scss'],
})
export class WeareInformationPage implements OnInit {
  weAreType: string;
  weAreInformationId: string;
  detail$: Observable<any>;
  constructor(
    private ekkidsService: EkkidsService, 
    private ekkleunderService: EkkleunderService, 
    private networksService: NetworksService, 
    private ministriesService: MinistriesService, 
    private route: ActivatedRoute, 
    private callNumber: CallNumber) { }

  ngOnInit() {
    this.weAreType = this.route.snapshot.params['weAreType'];
    this.weAreInformationId = this.route.snapshot.params['informationId'];
    this.loadData(this.weAreInformationId, this.weAreType);
  }

  loadData(id, type) {
    switch (type) {
      case 'ministries':
        this.detail$ = this.ministriesService.getMinistry(id);
        break;
      case 'networks':
        this.detail$ = this.networksService.getNetwork(id);
        break;
      case 'ekkids':
        this.detail$ = this.ekkidsService.getEkkids('1');
        break;
      case 'ekkleunder':
        this.detail$ = this.ekkleunderService.getEkkleunder('1');
        break;
    }
  }

  call(detail) {
    this.callNumber.callNumber(detail.contact, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
