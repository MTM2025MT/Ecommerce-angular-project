import { filter } from 'rxjs/operators';
import { UserService } from './../../services/user-service';
import { Component, inject, signal,OnInit } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import {ProductService} from '../../services/product-service';
import { Product } from '../../models/product.type';
import { CartService } from '../../services/cart-service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import {OnDestroy } from '@angular/core';
import { SharedSearchvalue } from '../../services/shared-searchvalue';
import { FilterPipePipe } from '../../pipes/filter-pipe-pipe';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { FilterbestwentyPipe } from '../../pipes/filterbestwenty-pipe';

@Component({
  selector: 'app-products',
    standalone: true,
  imports: [SliderModule,FormsModule, FilterPipePipe, RouterLink, CommonModule, CarouselModule, RatingModule],
  templateUrl: './products.html',

  styleUrl: './products.css'
})
export class Products {
   cartservice=inject(CartService);
   UserService=inject(UserService)
   router =inject(Router);
   ActivatedRoute=inject(ActivatedRoute);
   productService:ProductService=inject(ProductService);
   SharedSearchValueService=inject(SharedSearchvalue);
    rate!:number;
    rangeValues: number[] = [0, 80];
    searchText:string='';
    imageurl:string='foto.jpg';
    favourite=signal(this.UserService.defaultUser().favourite)
    Favouritebtn =(productid:string)=> {
      this.UserService.favouritebtn(productid)
      this.favourite.update(prev=>[...this.UserService.defaultUser().favourite])
    }
    productlist=signal<Product[]>([]);

  constructor(){
    this.SharedSearchValueService.searchTerm$.subscribe(term => {
    this.searchText = term;
  });
  }
  ngOnInit(): void {
     this.ActivatedRoute.params.subscribe(param=>{
       const category=param['category']
       if(!category){
         this.productService.getproducts();
         this.productlist.set(this.productService.productsSignal())
       }
        else{
          this.productService.getproductsbycategory(category).subscribe({
            next:(res)=>{ this.productlist.set(res);},
            error: (err)=>{console.log('error while fetching data from server and the error message is : '+err)}
          });
      }
    });

  }

  addToCart(item:Product){
    this.cartservice.addToCart(item);
  }

  getpricerangevalue(event:any){
   const eventitem=event.target.value;
   console.log(this.rangeValues)
   console.log(eventitem);
  }
   categories = [
  {
    id: 1,
    name: "groceries",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80",
    image2: "https://picsum.photos/800/600?random=101",
    products: 150,
    index: 0
  },
  {
    id: 2,
    name: "furniture",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    image2: "https://picsum.photos/800/600?random=102",
    products: 250,
    index: 1
  },
  {
    id: 3,
    name: "fragrances",
    image: "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=800&q=80",
    image2: "https://picsum.photos/800/600?random=103",
    products: 180,
    index: 2
  },
  {
    id: 4,
    name: "beauty",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    image2: "https://picsum.photos/800/600?random=104",
    products: 120,
    index: 3
  },
  {
    id: 5,
    name: "electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    image2: "https://picsum.photos/800/600?random=105",
    products: 320,
    index: 4
  },
  {
    id: 6,
    name: "clothing",
    image: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=800&q=80",
    image2: "https://picsum.photos/800/600?random=106",
    products: 410,
    index: 5
   }
   //,
  // {
  //   id: 7,
  //   name: "toys",
  //   image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
  //   image2: "https://picsum.photos/800/600?random=107",
  //   products: 200,
  //   index: 6
  // },
  // {
  //   id: 8,
  //   name: "books",
  //   image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  //   image2: "https://picsum.photos/800/600?random=108",
  //   products: 260,
  //   index: 7
  // },
  // {
  //   id: 9,
  //   name: "sports",
  //   image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
  //   image2: "https://picsum.photos/800/600?random=109",
  //   products: 140,
  //   index: 8
  // },
  // {
  //   id: 10,
  //   name: "home appliances",
  //   image: "https://images.unsplash.com/photo-1586201375761-83865001e31b?auto=format&fit=crop&w=800&q=80",
  //   image2: "https://picsum.photos/800/600?random=110",
  //   products: 190,
  //   index: 9
  // },
  // {
  //   id: 11,
  //   name: "automotive",
  //   image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=800&q=80",
  //   image2: "https://picsum.photos/800/600?random=111",
  //   products: 175,
  //   index: 10
  // },
  // {
  //   id: 12,
  //   name: "pets",
  //   image: "https://images.unsplash.com/photo-1558944351-c1e0b79a5b31?auto=format&fit=crop&w=800&q=80",
  //   image2: "https://picsum.photos/800/600?random=112",
  //   products: 220,
  //   index: 11
  // }
];
  getcategoryvalue(event:any){
    const category=event.target.value.name;
    if(category){
      this.productService.getproductsbycategory(category).subscribe({
        next:(res)=>{ this.productlist.set(res);},
        error: (err)=>{console.log('error while fetching data from server and the error message is : '+err)}
      });

  }
}
 FilterOpener(event:any){
  let filterBody;
  if( event.target.classList.contains('filter-header')){
     filterBody=event.target.nextElementSibling;
  }
  else if(event.target.parentElement.classList.contains('filter-header')){
    filterBody=event.target.parentElement.nextElementSibling;
  }
  else{
    return;
  }

   console.log(filterBody.classList.contains('open'));
    if(filterBody.classList.contains('open')){
      filterBody.classList.remove('open');
      return;
    }
    filterBody.classList.toggle('open');
  }
  Filter(event:any){

  }
  clearfilter(){

  }

  NavigatTosingleProduct(id:number){
      this.router.navigate(['main/single-product',id]);
  }

}
