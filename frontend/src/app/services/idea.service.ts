import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ENV } from '../constants';
import { Idea, NewIdea } from '../models/idea.model';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  private _ideas: WritableSignal<Idea[]> = signal([]);

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {
    this.http.get<Idea[]>(`${ENV.API_URL}`).subscribe({
      next: (ideas) => {
        this._ideas.set(ideas);
      },
      error: () => {
        this._ideas.set([]);
      },
    });
  }
  get ideas(): Signal<Idea[]> {
    return this._ideas;
  }

  createIdea(newIdea: NewIdea) {
    this.http.post<Idea[]>(`${ENV.API_URL}`, newIdea).subscribe({
      next: (newIdeas) => {
        this._ideas.set(newIdeas);
      },
    });
  }

  deleteIdea(ideaId: Idea['ideaId']) {
    this.http.delete(`${ENV.API_URL}/${ideaId}`).subscribe({
      next: () => {
        this._ideas.update((ideas) => ideas.filter((idea) => idea.ideaId !== ideaId));
        this.toastr.success('Idea deleted successfully');
      },
      error: () => {
        this.toastr.error('Idea could not be deleted');
      },
    });
  }
}
