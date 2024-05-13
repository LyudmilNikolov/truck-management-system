import { Route } from '@angular/router';

export const EMPLOYEES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components/employees-page/employees-page.component').then(employeesModule => employeesModule.EmployeesPageComponent),
  },
];