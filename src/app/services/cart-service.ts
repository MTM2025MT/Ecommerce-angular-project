import { UserService } from './user-service';

import { Injectable, inject, signal, OnDestroy, OnInit } from '@angular/core';
import { CartElement,Cart } from '../models/CartElement.type';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.type';
import { Observable, single, subscribeOn, Subscriber, tap, map, catchError, retry } from 'rxjs';
import { computed } from '@angular/core';
import { OrderingProcess } from '../services/ordering-process';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CartService {
    http:HttpClient=inject(HttpClient);
  cartservice=inject(OrderingProcess)
   UserService=inject(UserService)
   UserId=signal( this.UserService.defaultUser.id);
   cartlist =signal<CartElement[]>([]);
   Cart=signal<Cart>({
      products: [],
      total:0,
      id:99999,
      userId:0,
      totalProducts: 0,
      totalQuantity: 0
   });
   url:string=environment.apiUrl;
  countOfItems = computed(() =>
    this.Cart().products.reduce((acc, item) => acc + item.quantity, 0)
  );

  totalProducts=computed(()=>this.Cart().products.length)
  //total price
  total=computed(()=> this.Cart().products.reduce((acc, item) => acc + (item.price*item.quantity), 0))
  constructor() {

    this.UserService.getUsers().subscribe(
      {
        next:res=>this.UserId.set(res[0].id),
        error:err=>console.error(err)
      }
    )
    this.GetCartItemsByApi()
  }

    createCartForUser(userId: number) {
      const newCart: Cart = {
        userId:userId,
        id:(userId*93),
        products: [],
        total: 0,
        totalProducts: 0,
        totalQuantity: 0
      };

      this.http.post<Cart>(`${this.url}/carts`, newCart).subscribe({
        next: cart => {
          console.log('New cart created for user:', cart);
          this.Cart.set(cart);
        },
        error: err => console.error('Error creating cart:', err)
      });
    }

    addToCart(item: Product, quantity: number = 1) {
        const cart = [...this.Cart().products]; // get current cart
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.total = existingItem.price * existingItem.quantity;
            existingItem.discountedTotal = existingItem.total - (existingItem.total * existingItem.discountPercentage / 100);
            this.Cart.update(res=>{return {...res,products:cart}}); // update signal to trigger reactive changes
        } else {
            const newCartItem: CartElement = {
                id: item.id,
                quantity: quantity,
                title: item.title,
                price: item.price,
                total: item.price,
                discountPercentage: 0,
                discountedTotal: item.price,
                images:item.images,
                thumbnail: ''
            };
            cart.push(newCartItem)
            this.Cart.update(res=>{return {...res,products:cart}}); // update signal to trigger reactive changes
        }
    }

    GetCartItemsByApi(){
       return this.http.get<Cart[]>(`${this.url}/carts`).subscribe(
          {
            next:res=>{
              if(res){
                this.Cart.set(res.find(cart=>cart.userId==this.UserId())??this.Cart());
              }
              else{
                this.createCartForUser(this.UserId());
              }
            }
          }
        )
    }

      DecreaseFromCart(item: CartElement) {
          const cart = [...this.Cart().products];
          const index = cart.findIndex(c => c.id === item.id);

          if (index !== -1) {
              const existingItem = cart[index];
              if (existingItem.quantity > 1) {
                  existingItem.quantity -= 1;
                  existingItem.total = existingItem.price * existingItem.quantity;
                  existingItem.discountedTotal = existingItem.total - (existingItem.total * existingItem.discountPercentage / 100);
              } else {
                  cart.splice(index, 1);
              }

               this.Cart.update(res=>{return {...res,products:cart}}); // update signal to trigger reactive changes; // update signal to trigger reactive changes
          } else {
              console.log("Item not found in cart");
          }
      }
      RemoveFromCart(item:CartElement){
         let cart = [...this.Cart().products];
          const index = cart.findIndex(c => c.id === item.id);

          if (index !== -1) {
               cart=cart.filter(cartele => cartele.id !== item.id)
               this.Cart.update(res=>{return {...res,products:cart}}); // update signal to trigger reactive changes
          }
          else{
            console.log("something went worng ")
          }
      }

     SaveShopingCart(){
      this.Cart.update(previous=>({
          ...previous,
          total:this.total(),
          totalProducts: this.totalProducts(),
          totalQuantity: this.countOfItems()
      }))

       this.http.put(`${this.url}/carts/${this.Cart()?.id}`,this.Cart()).subscribe({
        next:res=>console.log(res),
        error(err) {
            console.log(err)
        },
      })
    }
    DeleteTheCart(){
      return this.http.delete(`${this.url}/carts/${this.Cart()?.userId}`)
    }

}
