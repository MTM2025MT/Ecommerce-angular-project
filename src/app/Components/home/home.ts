import { Component, inject, signal,OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import {ProductService} from '../../services/product-service';
import { Product } from '../../models/product.type';
import { CartService } from '../../services/cart-service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {OnDestroy } from '@angular/core';
import { SharedSearchvalue } from '../../services/shared-searchvalue';
import { FilterPipePipe } from '../../pipes/filter-pipe-pipe';
@Component({
  selector: 'app-home',
  imports: [FilterPipePipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit{
   cartservice=inject(CartService);
   router =inject(Router);
   SharedSearchValueService=inject(SharedSearchvalue)
   productService:ProductService=inject(ProductService);
    searchText:string='';
   imageurl:string='foto.jpg';
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
      this.router.navigate(['/single-product',id]);
  }
}
// //   this.productlist.update((products) =>
//   products.map(product => ({
//     ...product,
//     title: product.title.split(' ')[0] // update only title
//   }))
