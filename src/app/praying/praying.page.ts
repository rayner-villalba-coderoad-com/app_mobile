import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-praying',
  templateUrl: './praying.page.html',
  styleUrls: ['./praying.page.scss'],
})
export class PrayingPage implements OnInit {
  imageURL: string;
  constructor(private callNumber: CallNumber) { }
  
  ngOnInit() {
    this.imageURL = '/assets/img/oracion.jpeg';
  }

  call() {
    this.callNumber.callNumber('2222-66-59', true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
