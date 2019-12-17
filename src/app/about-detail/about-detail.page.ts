import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { BranchesService } from "@services/branches/branches.service";
import { Observable } from "rxjs";
import { Branch } from "@services/branches/branch.model";

@Component({
  selector: 'app-about-detail',
  templateUrl: './about-detail.page.html',
  styleUrls: ['./about-detail.page.scss'],
})
export class AboutDetailPage implements OnInit {
  private branchId: string;
  detail$: Observable<Branch>;
  title: string;
  defaultImage: string;
  
  constructor(
    private branchesService: BranchesService,
    private route: ActivatedRoute, 
    private callNumber: CallNumber
  ) { }

  ngOnInit() {
    this.branchId = this.route.snapshot.params['branchId'];
    this.defaultImage = '/assets/img/info_branch.jpg';
    this.detail$ = this.branchesService.getBranch(this.branchId);
    this.detail$.subscribe(res => {
      this.title = res['city'];
    });
  }

  call(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
