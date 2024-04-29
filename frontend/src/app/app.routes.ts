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
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component').then(dashboardModule => dashboardModule.DashboardComponent),
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./modules/vehicles/vehicles.routes').then(vehiclesModule => vehiclesModule.VEHICLES_ROUTES),
      },
      {
        path: 'employees',
        loadChildren: () => import('./modules/employees/employees.routes').then(employeesModule => employeesModule.EMPLOYEES_ROUTES),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
];
