
import { createAction, createReducer, on, props } from '@ngrx/store';
import { Note } from '../models/note';

export interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

export const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null
};

export const loadNotes = createAction('[Notes] Load');
export const loadNotesSuccess = createAction(
  '[Notes] Load Success',
  props<{ notes: Note[] }>()
);
export const loadNotesFailure = createAction(
  '[Notes] Load Failure',
  props<{ error: string }>()
);

export const createNote = createAction(
  '[Notes] Create',
  props<{ title: string; content: string }>()
);
export const updateNote = createAction(
  '[Notes] Update',
  props<{ id: string; title: string; content: string }>()
);
export const deleteNote = createAction(
  '[Notes] Delete',
  props<{ id: string }>()
);

export const notesReducer = createReducer(
  initialState,

  on(loadNotes, state => ({ ...state, loading: true, error: null })),
  on(loadNotesSuccess, (state, { notes }) => ({
    ...state, notes, loading: false
  })),
  on(loadNotesFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(createNote, state => ({ ...state, loading: true })),
  on(updateNote, state => ({ ...state, loading: true })),
  on(deleteNote, state => ({ ...state, loading: true }))
);
