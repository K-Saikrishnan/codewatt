import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IdeaService } from '../../services/idea.service';

@Component({
  selector: 'app-idea-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, ChipsModule, InputTextModule, InputTextareaModule],
  templateUrl: './idea-form.component.html',
  styleUrl: './idea-form.component.scss',
})
export class IdeaFormComponent implements OnInit {
  ideaForm!: FormGroup;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private ideaService: IdeaService,
  ) {}

  ngOnInit() {
    this.ideaForm = this.fb.group({
      title: '',
      description: '',
      tags: [],
    });
  }

  createIdea() {
    this.ideaService.createIdea(this.ideaForm.value);
    this.toastr.success('Idea created successfully');
    this.router.navigate(['/']);
  }
}
