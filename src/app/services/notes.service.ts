import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { NoteRequest } from '../models/note-request';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5071/notes';

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  getById(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  create(request: NoteRequest): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, request);
  }

  update(id: string, request: NoteRequest): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}