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
   return ["beauty","furniture","groceries"]
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
}
