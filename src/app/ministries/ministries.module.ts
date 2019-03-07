import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MinistriesPage } from './ministries.page';
import { DirectivesModule } from '@directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: MinistriesPage
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
  declarations: [MinistriesPage]
})
export class MinistriesPageModule {}
