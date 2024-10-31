import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Idea } from '../models/idea.model';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  getIdeas(): Observable<Idea[]> {
    return of([
      {
        id: 1,
        title: 'Idea 1',
        desc: 'Description 1',
        createdTs: new Date(),
        updatedTs: new Date(),
      },
      {
        id: 2,
        title: 'Idea 2',
        desc: 'Description 2',
        createdTs: new Date(),
        updatedTs: new Date(),
      },
    ]);
  }
}
