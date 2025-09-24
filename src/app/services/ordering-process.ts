import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Cart } from '../models/CartElement.type';
@Injectable({
  providedIn: 'root'
})
export class OrderingProcess {
    http:HttpClient=inject(HttpClient);
    url:string=environment.apiUrl;


}
