import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';
import { IdeaComponent } from '../idea/idea.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, IdeaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public ideas$: Observable<Idea[]>;

  constructor(private ideaService: IdeaService) {
    this.ideas$ = this.ideaService.getIdeas();
  }
}
