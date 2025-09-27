import { routes } from './../app.routes';
import { user } from './../models/User.type';
import { UserService } from './../services/user-service';
import { CanActivateFn,Router } from '@angular/router';

import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const user=userService.defaultUser
   if(user().id!==0){
    return true
   }
   else{
    router.navigate(['/loging'])
    return false
   }

};
