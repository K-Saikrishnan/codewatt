import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IdeaComponent } from './components/idea/idea.component';
import { Idea } from './models/idea.model';
import { IdeaService } from './services/idea.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, IdeaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public ideas$: Observable<Idea[]>;

  constructor(private ideaService: IdeaService) {
    this.ideas$ = this.ideaService.getIdeas();
  }
}
