import { retry } from 'rxjs';
import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { inject } from '@angular/core';
import { CartElement } from '../../models/CartElement.type';
import { CartService } from '../../services/cart-service';
import { UserService } from '../../services/user-service';
import { DecimalPipe } from '@angular/common';
import { RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-shoping-cart',
  imports: [DecimalPipe, RouterOutlet, RouterLink],
  templateUrl: './shoping-cart.html',
  styleUrl: './shoping-cart.css'
})
export class ShopingCart {
   imageurl='foto.jpg';
    Userservice=inject(UserService)
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
}

