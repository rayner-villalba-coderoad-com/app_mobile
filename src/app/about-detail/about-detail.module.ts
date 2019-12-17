import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AboutDetailPage } from './about-detail.page';
import { DirectivesModule } from '@directives/directives.module';

const routes: Routes = [
  {
    path: '',
    component: AboutDetailPage
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
  declarations: [AboutDetailPage]
})
export class AboutDetailPageModule {}
