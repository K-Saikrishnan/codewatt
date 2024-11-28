import { Component, Signal } from '@angular/core';
import { Idea } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';
import { IdeaComponent } from '../idea/idea.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IdeaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public ideas: Signal<Idea[]>;

  constructor(private ideaService: IdeaService) {
    this.ideas = this.ideaService.ideas;
  }
}
