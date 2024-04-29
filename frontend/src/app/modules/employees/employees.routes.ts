import { Route } from '@angular/router';

export const EMPLOYEES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./employees.component').then(employeesModule => employeesModule.EmployeesComponent),
  },
];