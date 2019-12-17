import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeareInformationPage } from './weare-information.page';
import { DirectivesModule } from '@directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: WeareInformationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeareInformationPage]
})
export class WeareInformationPageModule {}
