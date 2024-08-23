import { Route } from '@angular/router';

export const VEHICLES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./components/vehicles-page/vehicles-page.component').then(vehiclesModule => vehiclesModule.VehiclesPageComponent),
  },
];