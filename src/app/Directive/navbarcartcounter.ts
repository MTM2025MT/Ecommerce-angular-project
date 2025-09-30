
import { CartService } from './../services/cart-service';
import { Directive, effect, inject, OnInit, signal } from '@angular/core';
import { ElementRef } from '@angular/core';
@Directive({
  selector: '[appNavbarcartcounter]'
})
export class Navbarcartcounter implements OnInit {

   CartService=inject(CartService);
   element=inject(ElementRef);
  ngOnInit(): void {

  }
   displaycounter= effect(()=>{
      const count=this.CartService.countOfItems();
      this.element.nativeElement.style.setProperty('--DisplayValue',count > 0 ? 'flex' : 'none');
      this.element.nativeElement.textContent = count.toString();

     });





}



