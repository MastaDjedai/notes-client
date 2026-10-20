import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NotesService } from './services/notes.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatePipe } from '@ngx-translate/core';

import {
  loadNotes,
  createNote,
  updateNote,
  deleteNote
} from './store/notes.store';

import { NotesState } from './store/notes.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private store = inject(Store<{ notes: NotesState }>);
  private notesService = inject(NotesService);
  private translate = inject(TranslateService);

  notes$ = this.store.select(state => state.notes.notes);
  loading$ = this.store.select(state => state.notes.loading);
  error$ = this.store.select(state => state.notes.error);

  title = '';
  content = '';
  editingId: string | null = null;
  language: 'en' | 'uk' = 'en';

  ngOnInit(): void {
    this.translate.use(this.language);
    this.store.dispatch(loadNotes());
  }

  saveNote(): void {
    const title = this.title.trim();
    const content = this.content.trim();

    if (!title || !content) return;

    if (this.editingId) {
      this.store.dispatch(updateNote({
        id: this.editingId,
        title,
        content
      }));
    } else {
      this.store.dispatch(createNote({ title, content }));
    }

    this.resetForm();
  }

  editNote(note: { id: string; title: string; content: string }): void {
    this.editingId = note.id;
    this.title = note.title;
    this.content = note.content;
  }

  removeNote(id: string): void {
    if (confirm(this.language === 'en'
      ? 'Delete this note?'
      : 'Видалити цю нотатку?')) {
      this.store.dispatch(deleteNote({ id }));
    }
  }

  resetForm(): void {
    this.title = '';
    this.content = '';
    this.editingId = null;
  }

  toggleLanguage(): void {
    this.language = this.language === 'en' ? 'uk' : 'en';
    this.translate.use(this.language);
  }

  getNoteById(id: string): void {
    this.notesService.getById(id).subscribe({
      next: note => {
        this.editNote(note);
      },
      error: err => {
        console.error('Failed to get note:', err);
        alert(
          this.language === 'en'
            ? 'Note not found'
            : 'Нотатку не знайдено'
        );
      }
    });
  }
}
