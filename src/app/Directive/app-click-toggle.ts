import { Directive } from '@angular/core';
import { HostListener } from '@angular/core';
import { inject } from '@angular/core';
import { ElementRef } from '@angular/core';
@Directive({
  selector: '[appAppClickToggle]'
})
export class AppClickToggle {
     element=inject(ElementRef);
  constructor() { }
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    let targetedItem=event.target as HTMLElement
    let bodyitem;
    let icon;
  if( targetedItem.classList.contains('section-title-header')){
     bodyitem =targetedItem.nextElementSibling as HTMLElement
     icon= targetedItem.querySelector('i');
  }
  else if(targetedItem.parentElement?.classList.contains('section-title-header')){
    bodyitem=targetedItem.parentElement.nextElementSibling;
    icon=targetedItem.nextElementSibling;
  }
  else{
    return;
  }
  console.log(icon)
   if(!bodyitem){
        return
     }
    if(bodyitem.classList.contains('open')){
      icon?.classList.remove('rotete')
     bodyitem.classList.remove('open');
      return;
     }
     icon?.classList.toggle('rotete')
     bodyitem.classList.toggle('open');
  }

}
