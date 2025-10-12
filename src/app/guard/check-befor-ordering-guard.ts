import { CanActivateFn } from '@angular/router';

export const checkBeforOrderingGuard: CanActivateFn = (route, state) => {
  return true;
};
