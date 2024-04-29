import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { EntryComponent } from './layout/entry/entry.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/components/auth.routes').then(authModule => authModule.AUTH_ROUTES),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: EntryComponent,
    // children: [
    //   {
    //     path: 'home',
    //     loadComponent: () => import('./home/home.component').then(homeModule => homeModule.HomeComponent),
    //   },
    //   {
    //     path: 'employees',
    //     loadChildren: () => import('./employees/employees.routes').then(employeesModule => employeesModule.EMPLOYEES_ROUTES),
    //   },
    // ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    // redirectTo: 'home'
    redirectTo: ''
  },
];
