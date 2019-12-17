import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from '@directives/directives.module';

import { WearePage } from './weare.page';

const routes: Routes = [
  {
    path: '',
    component: WearePage
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
  declarations: [WearePage]
})
export class WearePageModule {}
