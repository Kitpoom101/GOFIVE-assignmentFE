import { Routes } from '@angular/router';
import { Dashboard } from './page/Dashboard/Dashboard';
import { NoPage } from './page/NoPage/NoPage';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'user', component: NoPage },
  { path: 'document', component: NoPage },
  { path: 'photo', component: NoPage },
  { path: 'hierachy', component: NoPage },
];
