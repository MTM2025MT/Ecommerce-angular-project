import { Directive, inject } from '@angular/core';
import { ElementRef } from '@angular/core';
@Directive({
  selector: '[appFavoriteDirective]'
})
export class FavoriteDirective {

  el=inject(ElementRef);
  constructor() { }


}
