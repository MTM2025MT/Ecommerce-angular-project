
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
import { CarouselModule } from 'primeng/carousel';
import { FilterbestwentyPipe } from '../../pipes/filterbestwenty-pipe';
@Component({
  selector: 'app-home',
  imports: [ RouterLink,CommonModule,CarouselModule,FilterbestwentyPipe],
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


  // currentIndex = 0; // carousel page index (PrimeNG updates this)
 activeIndex = 0;
 currentpage = 0;
 numVisible = 3; // number of items visible in the carousel
   onPageChange(event: any) {
    this.currentpage = event.page;
  }
    isItemVisible(index: number): boolean {
      const start = this.currentpage-1 ;
      const end = start + this.numVisible;
      // console.log( "current is "+this.currentpage+" index is "+index+"end is"+end+" numvisible is "+this.numVisible+"what should return "+(index > this.currentpage  && index < (this.currentpage + this.numVisible)));
    return index > start && index <= end;
  }
 categories = [
    {
      name: 'Wing Chair',
      products: 3584,
      image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
      index:0
    },
    {
      name: 'Wooden Chair',
      products: 157,
      image:"https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
      index:1
    },
    {
      name: 'Desk Chair',
      products: 154,
      image:  "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
      index:2
    },
    {
      name: 'Park Bench',
      products: 154,
      image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      index:3
    },
    {
      name: 'Sofa',
      products: 300,
      image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      index:4
    },
        {
      name: 'Wing Chair',
      products: 3584,
      image: "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
      index:5
    },
    {
      name: 'Wooden Chair',
      products: 157,
      image:"https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp",
      index:6
    },
    {
      name: 'Desk Chair',
      products: 154,
      image:  "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
      index:  7
    },
    {
      name: 'Park Bench',
      products: 154,
      image: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
      index:  8
    },
    {
      name: 'Sofa',
      products: 300,
      image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
      index:  9
    }
  ];

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ourproducts=[
    {
      name:'chair libaray',
      image:'chair-images/Image (1).png',
      id:0
    },
    {
      name:'chair libaray',
      image:'chair-images/Image (2).png',
            id:1
    },
    {
      name:'chair libaray',
      image:'chair-images/Image (3).png',
            id:2
    },
    {
      name:'chair libaray',
      image:'chair-images/Image (4).png',
            id:3
    },
    {
      name:'chair libaray',
      image:'chair-images/Image (5).png',
            id:4
    },
    {
      name:'chair libaray',
      image:'chair-images/Image (6).png',
            id:5
    },
    {
      name:'chair libaray',
      image:'chair-images/Image (7).png',
            id:6
    },
    {
      name:'chair libaray',
      image:'chair-images/Image (8).png',
            id:7
    }

  ]
  comments=[
    {
      name:'John Doe',
      text:'Great product! Highly recommend it.',
      image:'avatar-images/Avatar (1).png',
      id:0,
      role:'Customer',
      avatar:'https://cdn-icons-png.flaticon.com/512/147/147144.png'
    },
    {
      name:'Jane Smith',
      text:'Excellent quality and fast shipping.',
      image:'avatar-images/Avatar (2).png',
      id:1,
      role:'Customer',
      avatar:'https://cdn-icons-png.flaticon.com/512/147/147144.png'
    },
    {
      name:'Mike Johnson',
      text:'The product exceeded my expectations.',
      image:'avatar-images/Avatar (3).png',
      id:2,
      role:'Customer',
      avatar:'https://cdn-icons-png.flaticon.com/512/147/147144.png'
    },
    {
      name:'Emily Davis',
      text:'Fantastic service and great value for money.',
      image:'avatar-images/Avatar (4).png',
      id:3,
      role:'Customer',
      avatar:'https://cdn-icons-png.flaticon.com/512/147/147144.png'
    },
    {
      name:'David Wilson',
      text:'I am very satisfied with my purchase.',
      image:'avatar-images/Avatar (5).png',
      id:4,
      role:'Customer',
      avatar:'https://cdn-icons-png.flaticon.com/512/147/147144.png'
    }
  ]



}

