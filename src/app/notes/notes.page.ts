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
  
  constructor(public notesService: NotesService, private router: Router, private alertCtrl: AlertController) { 
    
  }

  ngOnInit() { 
    this.notesService.load();
  }

  goToNote(noteId) {
    const url = `tabs/more/notes/${noteId}`;
    this.router.navigateByUrl(url); 
  }

  addNewNote() {
    this.alertCtrl.create({
      header: 'Nueva Nota',
      message: '¿Cuál es el título de esta nota?',
      inputs: [
        {
          type: 'text',
          name: 'title',
          placeholder: 'Título'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.notesService.createNote(data.title);
            const id = this.notesService.getNoteId();
            this.goToNote(id);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
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
            this.notesService.deleteNote(note);
            await this.slidingList.closeSlidingItems();
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }
}
