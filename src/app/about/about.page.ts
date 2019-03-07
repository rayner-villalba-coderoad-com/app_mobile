import { Component, OnInit } from '@angular/core';
import { CallNumber } from "@ionic-native/call-number/ngx";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  imageURL: string;
  constructor(private callNumber: CallNumber) { }

  ngOnInit() {
    this.imageURL = 'http://www.ekklesia.net/wp-content/uploads/2017/03/banner-PORTAL.jpg';
  }
  call() {
    this.callNumber.callNumber('+59122317178', true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
