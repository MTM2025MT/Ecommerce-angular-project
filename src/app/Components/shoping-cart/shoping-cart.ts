import { retry } from 'rxjs';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { inject } from '@angular/core';
import { CartElement } from '../../models/CartElement.type';
import { CartService } from '../../services/cart-service';
import { UserService } from '../../services/user-service';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-shoping-cart',
  imports: [DecimalPipe],
  templateUrl: './shoping-cart.html',
  styleUrl: './shoping-cart.css'
})
export class ShopingCart implements OnInit,OnDestroy{
   imageurl='foto.jpg';
    Userservice=inject(UserService)
  shopingservice=inject(CartService);
  cartitems=signal<CartElement[]>([]);
  total=this.shopingservice.total;
  UserId=signal(1)
  ngOnInit(): void {
    const items=this.shopingservice.Cart().products
    this.cartitems.set(items);
    this.shopingservice.SaveShopingCart()
   }
   ngOnDestroy(): void {
       this.shopingservice.SaveShopingCart()
   }

   removeitem(item:CartElement){
    this.shopingservice.RemoveFromCart(item);
    this.cartitems.set(this.shopingservice.Cart().products);
   }
}

