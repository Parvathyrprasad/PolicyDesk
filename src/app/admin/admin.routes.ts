
import { Routes } from '@angular/router';

import { AdminLayout } from './admin-layout/admin-layout';
import { Users } from './users/users';
import { Settings } from './settings/settings';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: Users
      },
      {
        path: 'settings',
        component: Settings
      }
    ]
  }
];
