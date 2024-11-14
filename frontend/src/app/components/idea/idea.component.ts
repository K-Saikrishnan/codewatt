import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Idea } from '../../models/idea.model';
import { IdeaService } from '../../services/idea.service';

@Component({
  selector: 'app-idea',
  standalone: true,
  imports: [NgClass, DatePipe, ButtonModule, CardModule, ChipModule, TooltipModule, TagModule],
  templateUrl: './idea.component.html',
  styleUrl: './idea.component.scss',
})
export class IdeaComponent {
  @Input({ required: true }) idea!: Idea;

  readonly DATE_FORMAT = 'dd MMM yyyy';

  constructor(
    private ideaService: IdeaService,
    private toastr: ToastrService,
  ) {}

  deleteIdea(): void {
    this.ideaService.deleteIdea(this.idea.id).subscribe(() => {
      this.toastr.success('Idea deleted successfully');
    });
  }
}
