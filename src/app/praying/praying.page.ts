import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {
  ModalController,
  ActionSheetController,
  ToastController,
  AlertController,
  LoadingController
} from "@ionic/angular";
import { PrayingModalComponent } from '@modals/praying-modal/praying-modal.component';
import { OverlayEventDetail } from "@ionic/core";
import { PrayingService } from '@services/praying/praying.service';
import { myEnterAnimation } from '@animations/enter';
import { myLeaveAnimation } from '@animations/leave';
import { Observable } from "rxjs";


@Component({
  selector: 'app-praying',
  templateUrl: './praying.page.html',
  styleUrls: ['./praying.page.scss'],
})
export class PrayingPage implements OnInit {
  imageURL: string;
  whatsappNumber: string;
  callButtons: any[];
  prayingNumbers$: Observable<any>;
  prayingNumbers: any[];

  constructor(
    private callNumber: CallNumber, 
    private modalController: ModalController, 
    private prayingService: PrayingService, 
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public actionSheetController: ActionSheetController) { }
  
  ngOnInit() {
    this.imageURL = '/assets/img/oracion.jpg';
    this.whatsappNumber = '59172594377';
    this.prayingService.getPrayingNumbers().subscribe(res => {
      this.prayingNumbers = res;
      this.addNumbers(res);
    });
  }

  addNumbers(prayingNumbers) {
    this.callButtons = prayingNumbers.map(value => {
      const button = {
        text: value.phoneNumber,
        icon: 'call',
        handler: () => {
          this.callNumber.callNumber(value.phoneNumber, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
        }
      };

      return button;
    });
  }

  call() {
    this.presentActionSheet();
  }

  async openPrayingModal() {
    const modal: HTMLIonModalElement =
       await this.modalController.create({
          component: PrayingModalComponent,
          enterAnimation: myEnterAnimation,
          leaveAnimation: myLeaveAnimation,
          componentProps: {
            whatsappNumber: this.prayingNumbers[0].whatsappNumber
          }
    });
     
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
       if (detail.data && detail.data !== null) {
         this.sendingPraying(detail.data);
       }
    });
    
    await modal.present();
  }

  async sendingPraying(praying) {
    const loading = await this.loadingCtrl.create(
      {message: 'Enviando...'}
    );
    await loading.present();
    try {
      await this.prayingService.addPetition(praying);
      loading.dismiss().then(() => {
        this.displayMessage();
      });
    } catch(error) {
        console.log(error);
    }       
  }

  async displayMessage() {
    const toast = await this.toastCtrl.create({
      showCloseButton: true,
      color: 'primary',
      closeButtonText: 'Cerrar',
      message: '¡Su mensaje ha sido enviado, estaremos orando por esa necesidad!',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Números Disponibles:',
      mode: 'ios',
      buttons: [
        ...this.callButtons, 
      {
        text: 'Cancelar',
        role: 'destructive',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
