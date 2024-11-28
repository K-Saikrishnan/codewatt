import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { of } from 'rxjs';
import { Idea, NewIdea } from '../models/idea.model';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private _ideas: WritableSignal<Idea[]>;

  constructor() {
    this._ideas = signal([
      {
        id: 1,
        title: 'Idea 1',
        description: 'Description 1',
        tags: ['tag1', 'tag2'],
        createdTs: new Date(),
        updatedTs: new Date(),
      },
      {
        id: 2,
        title: 'Idea 2',
        description: 'Description 2',
        tags: ['tag1', 'tag2'],
        createdTs: new Date(),
        updatedTs: new Date(),
      },
    ]);
  }

  get ideas(): Signal<Idea[]> {
    return this._ideas;
  }

  createIdea(newIdea: NewIdea) {
    this._ideas.update((ideas) =>
      ideas.concat({
        id: this._ideas.length + 1,
        ...newIdea,
        createdTs: new Date(),
        updatedTs: new Date(),
      }),
    );
  }

  updateIdea(idea: Idea) {
    const idx = this._ideas().findIndex((i) => i.id === idea.id);

    this._ideas.update((ideas) => {
      ideas[idx] = idea;

      return ideas;
    });
  }

  deleteIdea(id: Idea['id']) {
    this._ideas.update((ideas) => ideas.filter((idea) => idea.id !== id));

    return of(true);
  }
}
