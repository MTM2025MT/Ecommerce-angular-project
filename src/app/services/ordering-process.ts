import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cart } from '../models/CartElement.type';
import { order } from '../models/Order.type';
@Injectable({
  providedIn: 'root'
})
export class OrderingProcess {
    http:HttpClient=inject(HttpClient);
    url:string=environment.apiUrl;

    createOrder(order:order){
      this.http.post<order>(`${this.url}/orders`, order).subscribe({
        next: order => {
          console.log('Order created:', order);
        },
      });
    }

}
