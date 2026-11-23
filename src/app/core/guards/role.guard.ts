
import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

export const roleGuard: CanMatchFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    return true;
  }

  const allowedRoles = route.data?.['roles'] as UserRole[] | undefined;

  if (allowedRoles && auth.hasRole(allowedRoles)) {
    return true;
  }

  return router.createUrlTree(['/forbidden']);
};
