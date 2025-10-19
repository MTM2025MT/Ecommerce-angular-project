import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.type';
import { catchError, Observable, of, ReplaySubject, tap ,map, max, retry, count, timer} from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http:HttpClient=inject(HttpClient);
  lastFetchTime=0;
    url:string=environment.apiUrl;
   private readonly FETCH_INTERVAL = 60 * 1000;
    productsSignal = signal<Product[]>([]);

   getproducts(){
    if(this.donow()||!this.lastFetchTime){
    return this.http.get<Product[]>(`${this.url}/products`).pipe(
      tap(res=>{
        this.productsSignal.set(res)
        this.lastFetchTime=Date.now();
      }
    ),
    catchError(error => {
        console.log(error);
        throw 'error in source. Details: ' + error;
    })
  );
  }
  else{
      return of(this.productsSignal());
  }
}
   getproduct(Id: number): Observable<Product> {
    const product=  this.getproducts().pipe(
      map((products: Product[]) =>  products.find((product: Product) => product.id == Id)),
      retry(
        {
          count: 3, // Number of retry attempts
          delay:(error, retryCount) => {
            if (retryCount ==2 ) {
              this.url=`{this.url}+m`
            }
            console.log(`Retrying... Attempt #${retryCount}`);
            return timer( retryCount * 1000); // Delay increases with each retry
          }
        }
      )
    ).pipe(
      map(product => {
        if (product === undefined) {
          throw new Error('Product not found');
        }
        return product;
      })
    );
    return product;
  }

  getCategories(){
   return   [
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
  }
 donow ():boolean {
  const now = Date.now();

  return (now - this.lastFetchTime < this.FETCH_INTERVAL)




}
  getproductsbycategory(category:string){
return this.http.get<Product[]>(`${this.url}/products?category=${category}`).pipe(

      catchError(error => {
        console.log(error);
        throw 'error in source. Details: ' + error;
    })
    );
  }
  getproductbyfilter(condition: (product: Product) => boolean) {
    return this.getproducts().pipe(
      map((products: Product[]) => products.filter(condition)),
      catchError(error => {
        console.log(error);
        throw 'error in source. Details: ' + error;
      })
    );
  }
  getproductbymanyfilters(conditions: ((product: Product) => boolean)[]) {
    return this.getproducts().pipe(
      map((products: Product[]) => products.filter(product => conditions.every(cond => cond(product)))),
      catchError(error => {
        console.log(error);
        throw 'error in source. Details: ' + error;
      })
    );
  }
}
