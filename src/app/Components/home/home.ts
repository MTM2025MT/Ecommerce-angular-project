import { UserService } from './../../services/user-service';
import { Component, inject, signal,OnInit } from '@angular/core';
import {ProductService} from '../../services/product-service';
import { Product } from '../../models/product.type';
import { CartService } from '../../services/cart-service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SharedSearchvalue } from '../../services/shared-searchvalue';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { FilterbestwentyPipe } from '../../pipes/filterbestwenty-pipe';
import { Output ,EventEmitter } from '@angular/core';
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
    @Output() ErrorEmitter = new EventEmitter<string>();
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
    this.productService.getproducts().subscribe({
      next:(res)=>{ this.productlist.set(res);},
      error: (err)=>{console.log('error while fetching data from server and the error message is : '+err)}
    });
  }

  addToCart(item:Product){
    this.cartservice.newaddToCart(item);
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
onImgError(event: Event, fallbackUrl: string) {
  const img = event.target as HTMLImageElement;
  img.src = fallbackUrl;
}




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

   products = [
    { name:'Makeup',Text: 'Best Grocery Collection For Your Daily Needs.', image: 'makeup2.png' },
    { name:'FreshMart',Text: 'Your Trusted Source for Fresh & Quality Products.', image: 'image.png' },
    { name:'Makeup2',Text: 'Best Grocery Collection For Your Daily Needs', image: 'grocery.png' },
  ];
  responsiveOptions3=[
    {
     breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1200px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '992px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint:'575.98px',
    numVisible:1,
    numScroll:1
  }
  ]
  responsiveOptions2 = [
  {
    breakpoint: '1400px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '1200px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '992px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint:'575.98px',
    numVisible:2,
    numScroll:1
  }
];

}

