import { UserService } from './user-service';

import { Injectable, inject, signal, OnDestroy, OnInit, effect } from '@angular/core';
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
     url:string=environment.apiUrl;
   http:HttpClient=inject(HttpClient);
  cartservice=inject(OrderingProcess)
   UserService=inject(UserService)
   defaultUser=this.UserService.defaultUser
   UserId=signal(0);
   cartlist =signal<CartElement[]>([]);
    randomidnumber =Math.floor(Math.random() * 10000000).toString();
    Cart = signal<Cart>({
      products: [],
      total:0,
      id:this.randomidnumber,
      userId:this.defaultUser().id,
      totalProducts: 0,
      totalQuantity: 0
   });

  countOfItems = computed(() =>
    this.Cart().products.reduce((acc, item) => acc + item.quantity, 0)
  );
  totalProducts=computed(()=>this.Cart().products.length)
  //total price
  total=computed(()=> this.Cart().products?.reduce((acc, item) => acc + (item.price*item.quantity), 0))

  constructor() {

    // effect(()=>{
    //    this.defaultUser=this.UserService.defaultUser
    //    this.UserId.set(this.defaultUser().id)
    //   this.GetCartItemsByApi()
    //   console.log("GetCartItemsByApi has runed ")
    // }
    // )
      this.UserService.userdidsigned.subscribe({
        next:(result)=>{
        this.defaultUser=this.UserService.defaultUser
        this.UserId.set(this.defaultUser().id)
          this.setCartItems()
        }
        ,
        error:(err)=>{
          console.log("there is no user")
        }
      })
  }

    createCartForUser() {
      this.http.post<Cart>(`${this.url}/carts`, this.Cart()).subscribe({
        next: cart => {
          console.log('New cart created for user:'+ cart.userId);
          console.log('the new object is ',cart)
        },
        error: err => console.error('Error creating cart:', err)
      });
    }
    ////////
    createCartForUserbyId(id:number) {
      this.Cart.update((p)=>({...p,userId:id}))
      this.http.post<Cart>(`${this.url}/carts`, this.Cart()).subscribe({
        next: cart => {
          console.log('New cart created for user:'+ cart.userId);
          console.log('the new object is ',cart)
        },
        error: err => console.error('Error creating cart:', err)
      });
    }
    //////////////
        setCartItems(){
          this.http.get<Cart[]>(`${this.url}/carts?userId=${this.UserId()}`).subscribe({
        next:(res)=>{
          this.Cart.set(res[0]??this.Cart());
        },
        error:(err)=>{
          console.error(err);
        }
      })

    }
    ///////////////
    newaddToCart(item: Product, quantity: number = 1) {
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
        this.SaveShopingCart()
    }
    ///////////////
     newDecreaseFromCart(item: CartElement) {
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
          this.SaveShopingCart()
      }
    //////////////
    // didn'tworkaddToCart(item: Product, quantity: number = 1) {
    //  this.http.get<Cart>(`${this.url}/carts/${this.Cart().id}`).pipe(
    //     map(Cart => Cart.products.find(p =>p.id  === item.id)),
    //   ).subscribe({
    //     next:res=>{
    //       if(res){
    //         const updated_cart_element={...res,quantity:(res.quantity+1),totalProducts:this.totalProducts(),totalQuantity:(this.countOfItems()+1)}
    //         const updated_cart_element2={
    //            ...this.Cart(),

    //            products:{...this.Cart().products}
    //         }
    //         this.http.put<Cart>(`${this.url}/carts/${this.Cart().id}`,updated_cart_element)
    //       }
    //       else{
    //         const new_cart_element:CartElement={
    //             id: item.id,
    //             quantity: quantity,
    //             title: item.title,
    //             price: item.price,
    //             total: item.price,
    //             discountPercentage: 0,
    //             discountedTotal: item.price,
    //             images:item.images,
    //             thumbnail: ''
    //         }
    //         this.http.post<CartElement>(`${this.url}/carts/${this.Cart().id}/products`,new_cart_element)
    //       }
    //         this.setCartItems()

    //     },
    //     error:err=>{
    //       console.error(err)
    //     }
    // })

    // }
  ///////////////
    // GetCartItemsByApi(){
    //    console.log("did getcartitemby api run")
    //    return this.http.get<Cart[]>(`${this.url}/carts`).subscribe(
    //       {

    //         next:res=>{
    //           const WantedCart=res.find(cart=>cart.userId==this.UserId());
    //           if(this.UserService.userdidsigned()){//to ensure that will not run when firt compling and just run if the user id is updated
    //            //finding the cart that want after we fetch data
    //             if(WantedCart){
    //                this.Cart.set({...WantedCart})
    //             }
    //             else{
    //                 this.Cart.update(perv=>({...perv,userId:this.defaultUser().id}))
    //                 this.createCartForUser()
    //             }
    //           }
    //         },
    //         error:err=>console.log(err)
    //       }
    //     )
    // }
    /////////////

    ///////////

    //  newDecreaseFromCart(item: Product, quantity: number = 1) {
    //    this.http.get<CartElement[]>(`${this.url}/carts/${this.Cart().id}/products`).pipe(
    //     map(products => products.find(p => p.id === item.id)),
    //   ).subscribe({
    //     next:res=>{
    //       if(res?.quantity){
    //         const updated_cart_element={...res,quantity:(res.quantity-1)}
    //         this.http.put<CartElement>(`${this.url}/carts/${this.Cart().id}/products/${res.id}`,updated_cart_element)
    //       }
    //       else if(res?.quantity==1){
    //           this.http.delete<CartElement>(`${this.url}/carts/${this.Cart().id}/products/${res.id}`)
    //                       this.setCartItems()
    //       }
    //     },
    //     error:err=>{
    //       console.error(err)
    //     }
    // })

    // }
      newRemoveFromCart(item:CartElement){
         let cart = [...this.Cart().products];
          const index = cart.findIndex(c => c.id === item.id);

          if (index !== -1) {
               cart=cart.filter(cartele => cartele.id !== item.id)
               this.Cart.update(res=>{return {...res,products:cart}}); // update signal to trigger reactive changes
          }
          else{
            console.log("something went worng ")
          }
          this.SaveShopingCart()
      }
    //   newRemoveFromCart(item:CartElement){
    //      this.http.get<CartElement[]>(`${this.url}/carts/${this.Cart().id}/products`).pipe(
    //     map(products => products.find(p => p.id === item.id)),
    //   ).subscribe({
    //     next:res=>{
    //       if(res){
    //         this.http.delete<CartElement>(`${this.url}/carts/${this.Cart().id}/products/${res.id}`)
    //         this.setCartItems()
    //       }
    //     },
    //     error:err=>{
    //       console.error(err)
    //       console.error("mostly this element doesn't exisit ")
    //     }
    // })
    //   }

     SaveShopingCart(){
      this.Cart.update(previous=>({
          ...previous,
          total:this.total(),
          totalProducts: this.totalProducts(),
          totalQuantity: this.countOfItems()
      }))

       this.http.put(`${this.url}/carts/${this.Cart().id}`,this.Cart()).subscribe({
        next:res=>console.log(res),
        error(err) {
            console.log(err)
        },
      })
    }
     DeleteTheCart(){
      this.http.delete(`${this.url}/carts/${this.Cart().id}`).subscribe({
        next:res=>console.log(res),
        error(err) {
            console.log(err)
        },
      })

      this.randomidnumber =Math.floor(Math.random() * 10000000).toString();
      this.Cart.update((p)=>({...p,
        products:[],
       total:0,
       id:this.randomidnumber,
       userId:this.defaultUser().id,
       totalProducts: 0,
       totalQuantity: 0

      }))
      this.createCartForUser()
      this.SaveShopingCart()

      // products: [],
      // total:0,
      // id:this.randomidnumber,
      // userId:this.defaultUser().id,
      // totalProducts: 0,
      // totalQuantity: 0
      // }
    }

}
