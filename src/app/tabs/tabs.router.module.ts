import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'events',
        children: [
          {
            path: '',
            loadChildren: '../events/events.module#EventsPageModule'
          },
          {
             path: ':eventId',
            loadChildren: '../event-details/event-details.module#EventDetailsPageModule'
          }
        ]
      },
      {
        path: 'preachings',
        children: [
          {
            path: '',
            loadChildren: '../preachings/preachings.module#PreachingsPageModule'
          },
          {
            path: ':preachingId',
            loadChildren: '../preaching-details/preaching-details.module#PreachingDetailsPageModule'
          },
          {
            path: ':preachingId/reading',
            loadChildren: '../preaching-reading/preaching-reading.module#PreachingReadingPageModule'
          }
        ]
      },
      {
        path: 'praying',
        children: [
          {
            path: '',
            loadChildren: '../praying/praying.module#PrayingPageModule'
          }
        ]
      },
      {
        path: 'weare',
        children: [
          {
            path: '',
            loadChildren: '../weare/weare.module#WearePageModule'
          },
          {
            path: ':weAreType',
           loadChildren: '../weare-detail/weare-detail.module#WeareDetailPageModule'
          },
          {
            path: ':weAreType/:informationId',
           loadChildren: '../weare-information/weare-information.module#WeareInformationPageModule'
          },
          {
            path: 'ekkids',
           loadChildren: '../weare-information/weare-information.module#WeareInformationPageModule'
          },
          {
            path: 'ekkleunder',
           loadChildren: '../weare-information/weare-information.module#WeareInformationPageModule'
          },
        ]
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            loadChildren: '../more/more.module#MorePageModule'
          },
          { path: 'about',
            loadChildren: '../about/about.module#AboutPageModule' 
          },
          { path: 'about/:branchId', 
            loadChildren: '../about-detail/about-detail.module#AboutDetailPageModule' 
          },
          { path: 'areas', 
            loadChildren: '../areas/areas.module#AreasPageModule' 
          },
          { path: 'areas/:areaId', 
            loadChildren: '../area-detail/area-detail.module#AreaDetailPageModule' 
          },
          { 
            path: 'notes', 
            loadChildren: '../notes/notes.module#NotesPageModule' 
          },
          { 
            path: 'notes/newNote', 
            loadChildren: '../notes-details/notes-details.module#NotesDetailsPageModule'
          },
          { 
            path: 'notes/:noteId', 
            loadChildren: '../notes-details/notes-details.module#NotesDetailsPageModule'
          },
          {
            path: 'profile',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          },
          { path: 'links',
            loadChildren: '../links/links.module#LinksPageModule'
          },
          {
            path: 'wallpapers',
            loadChildren: '../wallpapers/wallpapers.module#WallpapersPageModule'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
