import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { PrayingPage } from './praying.page';
import { DirectivesModule } from '@directives/directives.module';
import { ModalsModule } from '@modals/modals.module';

const routes: Routes = [
  {
    path: '',
    component: PrayingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule,
    ModalsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PrayingPage]
})
export class PrayingPageModule {}
