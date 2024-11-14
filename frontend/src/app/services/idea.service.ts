import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Idea, NewIdea } from '../models/idea.model';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  mockIdeas: Idea[] = [
    {
      id: 1,
      title: 'Idea 1',
      description: 'Description 1',
      tags: ['tag1', 'tag2'],
      votes: 0,
      createdTs: new Date(),
      updatedTs: new Date(),
    },
    {
      id: 2,
      title: 'Idea 2',
      description: 'Description 2',
      tags: ['tag1', 'tag2'],
      votes: 0,
      createdTs: new Date(),
      updatedTs: new Date(),
    },
  ];

  getIdeas(): Observable<Idea[]> {
    return of(this.mockIdeas);
  }

  createIdea(newIdea: NewIdea): Observable<boolean> {
    this.mockIdeas.push({
      id: this.mockIdeas.length + 1,
      ...newIdea,
      createdTs: new Date(),
      updatedTs: new Date(),
    });

    return of(true);
  }

  updateIdea(idea: Idea) {
    const index = this.mockIdeas.findIndex((i) => i.id === idea.id);
    this.mockIdeas[index] = {
      ...idea,
      updatedTs: new Date(),
    };
  }

  deleteIdea(id: Idea['id']): Observable<boolean> {
    this.mockIdeas = this.mockIdeas.filter((idea) => idea.id !== id);

    return of(true);
  }
}
