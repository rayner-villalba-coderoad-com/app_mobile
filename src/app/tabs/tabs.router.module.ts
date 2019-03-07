import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'ekklenews',
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
        path: 'ministries',
        children: [
          {
            path: '',
            loadChildren: '../ministries/ministries.module#MinistriesPageModule'
          }
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
          { path: 'areas', 
            loadChildren: '../areas/areas.module#AreasPageModule' 
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
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/ekklenews',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/ekklenews',
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
