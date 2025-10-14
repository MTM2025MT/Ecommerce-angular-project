import { UserService } from './user-service';
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
    UserService:UserService=inject(UserService);
    userId:number=this.UserService.defaultUser().id;

    createOrder(order:order){
      order.createAt=new Date();
      this.http.post<order>(`${this.url}/orders`, order).subscribe({
        next: order => {
          console.log('Order created:', order);
        },
      });
    }
    getUserOrders(){
      console.log(this.UserService.defaultUser().id)
      return this.http.get<order[]>(`${this.url}/orders?user_id=${this.UserService.defaultUser().id}`);
    }
    getAllOrders(){
      return this.http.get<order[]>(`${this.url}/orders?_expand=user&_embed=orderItems`);
    }

}
