import { ProductService } from './../../services/product-service';
import { UserService } from './../../services/user-service';
import { CartService } from './../../services/cart-service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink,OutletContext } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Component, HostListener, inject, OnDestroy, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule,RouterOutlet,Navbar],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {
   CartService=inject(CartService)
   UserService=inject(UserService)
   ProductService=inject(ProductService)
   Categories: string[] = [];
   constructor(){
    this.Categories=this.ProductService.getCategories()
   }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.CartService.SaveShopingCart();
    this.UserService.updatinguser()
  }


}
