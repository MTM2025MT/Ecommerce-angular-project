
import { UserService } from './../../services/user-service';
import { Component, inject, signal,OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import {ProductService} from '../../services/product-service';
import { Product } from '../../models/product.type';
import { CartService } from '../../services/cart-service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {OnDestroy } from '@angular/core';
import { SharedSearchvalue } from '../../services/shared-searchvalue';
import { FilterPipePipe } from '../../pipes/filter-pipe-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FilterPipePipe, RouterLink,CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit{
   cartservice=inject(CartService);
   UserService=inject(UserService)
   router =inject(Router);
   productService:ProductService=inject(ProductService);
   SharedSearchValueService=inject(SharedSearchvalue);

    searchText:string='';
    imageurl:string='foto.jpg';
    favourite=signal(this.UserService.defaultUser().favourite)
    Favouritebtn =(productid:string)=> {
      this.UserService.favouritebtn(productid)
      this.favourite.update(prev=>prev)
    }
    productlist=signal<Product[]>([]);

  constructor(){
    this.SharedSearchValueService.searchTerm$.subscribe(term => {
    this.searchText = term;
  });
  }
  ngOnInit(): void {
    this.productService.getproducts().subscribe({
      next:(res)=>{ this.productlist.set(res);},
      error: (err)=>{console.log('error while fetching data from server and the error message is : '+err)}
    });


  }

  addToCart(item:Product){
    this.cartservice.addToCart(item);
  }

  NavigatTosingleProduct(id:number){
      // this.router.navigate(['/single-product',id]);
  }

  currentIndex = 0;
  pageSize = 4; // show 4 at a time

  nextPage() {
    if (this.currentIndex + this.pageSize < this.productlist.length) {
      this.currentIndex += this.pageSize;
    }
  }

  prevPage() {
    if (this.currentIndex - this.pageSize >= 0) {
      this.currentIndex -= this.pageSize;
    }
  }
}

