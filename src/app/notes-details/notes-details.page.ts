import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { NotesService } from "@services/notes/notes.service";
import { Note } from "@services/notes/note.model";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.page.html',
  styleUrls: ['./notes-details.page.scss'],
})
export class NotesDetailsPage implements OnInit {
  private note: Note;
  constructor(private route: ActivatedRoute, private notesService: NotesService, private alertCtrl: AlertController) { }

  ngOnInit() {
    let noteId = this.route.snapshot.paramMap.get('noteId');
    
    if (noteId) {
      this.setupEditMode(noteId);
    } else {
      this.setupCreateMode();
    }
  }

  setupEditMode(noteId) {
    if (this.notesService.loaded) {
      this.note = this.notesService.getNote(noteId)
    } else {
      this.notesService.load().then(() => {
        this.note = this.notesService.getNote(noteId)
      });
    }
  }

  setupCreateMode() {
    this.note = {
      id: '',
      title: 'Nueva Nota',
      content: ''
    };
  }
  
  saveNote(note) {
    if (note.id === '') {
      this.createNewNote(note);
    } else {
      this.updateNote();
    }
  }

  createNewNote(note) {
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
            note.title = data.title;
            this.notesService.createNote(note);
          }
        }
      ]
    }).then((alert) => {
      alert.present();
    });
  }

  updateNote() {
    this.notesService.save();
  }
}
