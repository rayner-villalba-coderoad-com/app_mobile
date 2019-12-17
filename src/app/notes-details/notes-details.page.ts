import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { NotesService } from "@services/notes/notes.service";
import { Note } from "@services/notes/note.model";
import { AlertController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.page.html',
  styleUrls: ['./notes-details.page.scss'],
})
export class NotesDetailsPage implements OnInit {
  note: Note;
  constructor(
    private route: ActivatedRoute, 
    private notesService: NotesService, 
    public toastCtrl: ToastController,
    private router: Router, 
    private alertCtrl: AlertController) { }

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
      this.displayMessage();
    }
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
            this.router.navigateByUrl('tabs/more/notes');
          }
        }]
    }).then((alert) => {
      alert.present();
    });
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

  async displayMessage() {
    const toast = await this.toastCtrl.create({
      showCloseButton: true,
      color: 'primary',
      closeButtonText: 'Cerrar',
      message: '¡Su nota se ha guardado exitósamente!',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
