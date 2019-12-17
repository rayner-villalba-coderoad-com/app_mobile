import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PrayingModalComponent } from './praying-modal/praying-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [
    PrayingModalComponent
  ],
  entryComponents: [
    PrayingModalComponent
  ]
})
export class ModalsModule {}