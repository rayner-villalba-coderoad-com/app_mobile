import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-praying-modal',
  templateUrl: './praying-modal.component.html',
  styleUrls: ['./praying-modal.component.scss'],
})
export class PrayingModalComponent implements OnInit {
  public onPrayingForm: FormGroup;
  private whatsappNumber: string;

  constructor(private modalController: ModalController, private navParams: NavParams,
    private formBuilder: FormBuilder, private iab: InAppBrowser) { }

  ngOnInit() {
    this.onPrayingForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required
      ])],
      'phone': [null, Validators.compose([
        Validators.required
      ])],
      'prayFor': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  ionViewWillEnter() {
    this.whatsappNumber = this.navParams.get('whatsappNumber');
  }

  async close() {    
    await this.modalController.dismiss();
  }
  async send(prayingForm: FormGroup) {
    if (prayingForm.valid) {
      const { name, phone, prayFor } = prayingForm.value;
      const prayingPetitionDate: Date = new Date();
      const result = {
        name,
        phone,
        prayFor,
        prayingPetitionDate
      };

      await this.modalController.dismiss(result);
    }
  }
  
  async sendWhatsappMessage() {
    const url = `https://api.whatsapp.com/send?phone=${this.whatsappNumber}`;
    this.iab.create(url, '_system');
    await this.modalController.dismiss();
  }
}
