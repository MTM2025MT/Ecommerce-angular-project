import { ProductService } from './../../services/product-service';
import { Component, signal, OnInit } from '@angular/core';
import { Product } from '../../models/product.type';
import { UserService } from '../../services/user-service';
import { inject } from '@angular/core';
import { FilterPipePipe } from '../../pipes/filter-pipe-pipe';
import { CartService } from '../../services/cart-service';
import { SharedSearchvalue } from '../../services/shared-searchvalue';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-favourit-page',
  imports: [FilterPipePipe,RouterLink],
  templateUrl: './favourit-page.html',
  styleUrl: './favourit-page.css'
})
export class FavouritPage implements OnInit {
  cartservice=inject(CartService);
  userService=inject(UserService)
  ProductService=inject(ProductService)
  SharedSearchValueService=inject(SharedSearchvalue);
  fovouriteItems=signal<Product[]>([]);
  searchText:string='';
   imageurl:string='foto.jpg';
  ngOnInit(): void {
    const favouriteIds = this.userService.defaultUser().favourite;
    this.ProductService.getproducts().subscribe({
      next:(res)=>{
        const favProducts = res.filter(product => favouriteIds.includes((product.id).toString()));
        this.fovouriteItems.set(favProducts);
         console.log(this.fovouriteItems());
      },
      error: (err)=>{console.log('error while fetching data from server and the error message is : '+err)}
    });

  }
    constructor(){
    this.SharedSearchValueService.searchTerm$.subscribe(term => {
    this.searchText = term;
  });
  }
     favourite=signal(this.userService.defaultUser().favourite)
     Favouritebtn =(productid:string)=> {
      this.userService.favouritebtn(productid)
      this.favourite.update(prev=>prev)
    }
    addToCart(item:Product){
    this.cartservice.addToCart(item);
  }
    NavigatTosingleProduct(id:number){
      // this.router.navigate(['/single-product',id]);
  }
}
