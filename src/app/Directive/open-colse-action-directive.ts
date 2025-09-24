import { Directive, effect, input, output, signal } from '@angular/core';
import { ElementRef, inject } from '@angular/core';
@Directive({
  selector: '[appOpenColseActionDirective]'
})
export class OpenColseActionDirective {
   element=inject(ElementRef);
   valueOflock=input(false);
  //  valueoflocksignal=signal(false)
  //  ValueOfLock=output()
  constructor() {

    effect(() => {
      if(!this.valueOflock()){
        this.element.nativeElement.style.display='none';

      }
      else{
        this.element.nativeElement.style.display='grid';
      }
  }
 );
   }


}
