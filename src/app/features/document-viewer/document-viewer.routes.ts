import {Route} from '@angular/router';
import {DocumentPageComponent} from './pages/document-page.component';

export const DocumentViewerRoutes: Route[] = [
  {
    path: 'document/:imgDocumentId',
    loadComponent: () => import('./pages/document-page.component').then(m => m.DocumentPageComponent),
  },
  {
    path: '',
    redirectTo: 'document/1',
    pathMatch: 'full',
  }
];
