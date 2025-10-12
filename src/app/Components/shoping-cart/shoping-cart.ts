import { retry } from 'rxjs';
import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { inject } from '@angular/core';
import { CartElement } from '../../models/CartElement.type';
import { CartService } from '../../services/cart-service';
import { UserService } from '../../services/user-service';
import { DecimalPipe } from '@angular/common';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shoping-cart',
  imports: [DecimalPipe, RouterOutlet],
  templateUrl: './shoping-cart.html',
  styleUrl: './shoping-cart.css'
})
export class ShopingCart {
   imageurl='foto.jpg';
    Userservice=inject(UserService)
      router =inject(Router);
      ActivatedRoute=inject(ActivatedRoute);
  shopingservice=inject(CartService);
  cartitems=signal<CartElement[]>([]);
  total=this.shopingservice.total;
  UserId=signal(0)
  items=signal(this.shopingservice.Cart().products)
  constructor(){
    effect(()=>{
     let items=this.shopingservice.Cart().products
     this.items.set(items)
    }
    )
    this.shopingservice.SaveShopingCart()
   }


   removeitem(item:CartElement){
    this.shopingservice.RemoveFromCart(item);
    this.cartitems.set(this.shopingservice.Cart().products);
   }
   NavigattoOrder(){
    console.log(this.router.url)
    if(this.router.url==='/main/shoping-cart'){
      this.router.navigate(['order'],{relativeTo:this.ActivatedRoute})
    }else{
      this.router.navigate(['/main/shoping-cart'])
    }

   }
}

