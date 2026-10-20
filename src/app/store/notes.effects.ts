
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { NotesService } from '../services/notes.service';
import {
  loadNotes,
  loadNotesSuccess,
  loadNotesFailure,
  createNote,
  updateNote,
  deleteNote
} from './notes.store';

@Injectable()
export class NotesEffects {
  private actions$ = inject(Actions);
  private notesService = inject(NotesService);
  private store = inject(Store);

  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotes),
      mergeMap(() =>
        this.notesService.getAll().pipe(
          map(notes => loadNotesSuccess({ notes })),
          catchError(() => of(loadNotesFailure({ error: 'Failed to load notes' })))
        )
      )
    )
  );

  createNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createNote),
      mergeMap(({ title, content }) =>
        this.notesService.create({ title, content }).pipe(
          tap(() => this.store.dispatch(loadNotes())),
          map(() => ({ type: '[Notes] Create Success' })),
          catchError(() => of(loadNotesFailure({ error: 'Failed to create note' })))
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateNote),
      mergeMap(({ id, title, content }) =>
        this.notesService.update(id, { title, content }).pipe(
          tap(() => this.store.dispatch(loadNotes())),
          map(() => ({ type: '[Notes] Update Success' })),
          catchError(() => of(loadNotesFailure({ error: 'Failed to update note' })))
        )
      )
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteNote),
      mergeMap(({ id }) =>
        this.notesService.delete(id).pipe(
          tap(() => this.store.dispatch(loadNotes())),
          map(() => ({ type: '[Notes] Delete Success' })),
          catchError(() => of(loadNotesFailure({ error: 'Failed to delete note' })))
        )
      )
    )
  );
}
