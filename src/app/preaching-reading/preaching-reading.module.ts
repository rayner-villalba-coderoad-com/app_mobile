import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PreachingReadingPage } from './preaching-reading.page';

const routes: Routes = [
  {
    path: '',
    component: PreachingReadingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PreachingReadingPage]
})
export class PreachingReadingPageModule {}
