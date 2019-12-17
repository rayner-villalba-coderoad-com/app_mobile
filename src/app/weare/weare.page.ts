import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-weare',
  templateUrl: './weare.page.html',
  styleUrls: ['./weare.page.scss'],
})
export class WearePage implements OnInit {
  imageURL: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.imageURL = '/assets/img/modelo.jpg';
  }
  
  goToMinistries() {
    this.router.navigate(['tabs/weare', 'ministries']);
  }

  goToNetworks() {
    this.router.navigate(['tabs/weare', 'networks']);
  }

  goToEkkids() {
    this.router.navigate(['tabs/weare/ekkids', 'info']);
  }

  goToEkkleunder() {
    this.router.navigate(['tabs/weare/ekkleunder', 'info']);
  }
}
