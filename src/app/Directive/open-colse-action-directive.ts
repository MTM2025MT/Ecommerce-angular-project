import { Directive, effect, input, output, signal } from '@angular/core';
import { ElementRef, inject } from '@angular/core';
import { HostListener } from '@angular/core';
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
  //  openclosetoggle(event:any){
  //   let bodyitem;

  // if( event.target.classList.contains('section-title-header')){
  //    bodyitem=event.target.nextElementSibling;

  // }
  // else if(event.target.parentElement.classList.contains('section-title-header')){
  //   bodyitem=event.target.parentElement.nextElementSibling;
  // }
  // else{
  //   return ;
  // }
  //  console.log(event.target)
  //  console.log(bodyitem.classList.contains('open'));
  //      console.log(bodyitem.classList)
  //   if(bodyitem.classList.contains('open')){
  //     bodyitem.classList.remove('open');
  //     return;
  //   }
  //   bodyitem.classList.toggle('open');
  //  }
