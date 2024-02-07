import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // check if the user has a valid JWT
  if (authService.isJwtAvailable()) {
    // return true and activate the route
    return true;
  }
  // otherwise, check if the current route is one of the exceptions
  const exceptions = ['login', 'register', 'about-us', 'contact'];
  if (exceptions.includes(route.url[0].path)) {
    // return true and activate the route
    return true;
  }
  // otherwise, redirect to log-in and return false
  router.navigate(['/login']).then(r => '/login');
  return false;
}
