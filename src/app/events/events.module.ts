import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicImageLoader } from 'ionic-image-loader';
import { ComponentsModule } from '../components/components.module';
import { IonicModule } from '@ionic/angular';
import { EventsResolver } from './events.resolver';
import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage,
    resolve: { data: EventsResolver }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicImageLoader,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventsPage],
  providers: [EventsResolver]
})
export class EventsPageModule {}
