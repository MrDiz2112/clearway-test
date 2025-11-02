import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/document-viewer/document-viewer.routes').then(m => m.DocumentViewerRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
