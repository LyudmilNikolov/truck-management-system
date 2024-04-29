import { Route } from '@angular/router';

export const VEHICLES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./vehicles.component').then(vehiclesModule => vehiclesModule.VehiclesComponent),
  },
];