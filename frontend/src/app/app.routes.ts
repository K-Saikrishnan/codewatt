import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IdeaFormComponent } from './components/idea-form/idea-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Add Your Idea' },
  { path: 'create', component: IdeaFormComponent, title: 'Add Your Idea' },

  { path: '**', redirectTo: '' },
];

export enum PAGE {
  HOME = '',
  CREATE = 'create',
}
