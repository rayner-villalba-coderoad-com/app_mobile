import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from "@ionic/angular";

import { Note } from '@services/notes/note.model';
import { NotesService } from "@services/notes/notes.service";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  @ViewChild('slidingList') slidingList;
  notes: Note[];
  
  constructor(private notesService: NotesService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.notesService.load();
  }

  addNewNote() {
    const url = 'tabs/more/notes/newNote';
    this.router.navigateByUrl(url); 
  }

  goToNote(note) {
    const url = `tabs/more/notes/${note.id}`;
    this.router.navigateByUrl(url); 
  }

  confirmNoteDeletion(note) {
    this.alertCtrl.create({
      header: 'Eliminar Nota',
      message: '¿Deseas eliminar esta nota?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Si',
          handler: async() => {
            await this.slidingList.closeSlidingItems();
            this.notesService.deleteNote(note);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }
}
