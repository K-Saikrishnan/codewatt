import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Idea } from '../../models/idea.model';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss',
})
export class IdeaComponent {
  @Input({ required: true }) idea!: Idea;

  readonly DATE_FORMAT = 'dd MMM yyyy';
}
