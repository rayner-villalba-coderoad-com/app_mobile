import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: Note[] = [];
  public loaded: boolean = false;
  public noteId: string;

  constructor(private storage: Storage) { }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get('notes').then((notes) => {
        if(notes != null) {
          this.notes = notes;
        }
        
        this.loaded = true;
        resolve(true);
      });
    });
  }
    
  save(): void {
    this.storage.set('notes', this.notes);
  }
    
  getNote(id): Note {
    return this.notes.find(note => note.id === id);
  }
    
  createNote(title): void {
    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;
    this.noteId = id + '';
    this.notes.push({
      id: this.noteId,
      title: title,
      content: ''
    });
    
    this.save();
  }

  getNoteId() {
    return this.noteId;
  }
    
  deleteNote(note): void {
    let index = this.notes.indexOf(note);
    if (index > -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  }
}
