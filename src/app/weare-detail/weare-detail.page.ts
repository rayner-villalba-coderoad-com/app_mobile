import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NetworksService } from "@services/networks/networks.service";
import { MinistriesService } from "@services/ministries/ministries.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-weare-detail',
  templateUrl: './weare-detail.page.html',
  styleUrls: ['./weare-detail.page.scss'],
})
export class WeareDetailPage implements OnInit {
  contents$: Observable<any[]>;
  weAreType: string;
  loading: boolean;

  constructor(private networksService: NetworksService, private ministriesService: MinistriesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loading = false;
    this.weAreType = this.route.snapshot.params['weAreType'];
    this.loadContent(this.weAreType);  
  }

  loadContent(type) {
    if (type === 'ministries') {
      this.contents$ = this.ministriesService.getMinistries();
    } else {
      this.contents$ = this.networksService.getNetworks();
    }
  }

  getInformation(content) {
    const url = `tabs/weare/${this.weAreType}/${content.id}`;
    this.router.navigateByUrl(url);
  }
}


