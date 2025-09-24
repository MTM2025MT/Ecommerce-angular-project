import { Injectable, OnInit ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {user} from '../models/User.type'
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs';
import { Address } from '../models/User.type';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
    http:HttpClient=inject(HttpClient);
    url=environment.apiUrl
defaultUser: user = {
  id: 90,
  firstName: "Mohamed",
  lastName: "Kamal",
  maidenName: "Ahmed",
  age: 25,
  gender: "male",
  email: "mohamed.kamal@example.com",
  phone: "+966512345678",
  password: "MySecurePass123",
  birthDate: "2000-05-15",
  image: "https://randomuser.me/api/portraits/men/45.jpg",
  addresses: [{
    id:"defulat",
    name:"demo",
    address: "123 King Fahd Road",
    default:true,
    city: "Riyadh",
    state: "Riyadh",
    stateCode: "RD",
    postalCode: "11564",
    coordinates: {
      lat: 24.7136,
      lng: 46.6753
    },
    country: "Saudi Arabia"
  }],
  bank:[
    {
    cardExpire: "06/27",
    cardNumber: "000000000000",
    cardType: "mastercard",
    currency: "usd",
    iban: "Tr000fsf025522",
    cvv:245,
    name:"mo"
    }
  ],
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  role: "user"
};
ngOnInit(): void {
    this.getUsers().subscribe(
      {
       next:res=>{this.defaultUser=res[0]},
       error:err=>console.error(err)
      }
    )
}
  getUsers(){

    return this.http.get<user[]>(`${this.url}/users`).pipe(
    catchError(error => {
        console.log(error);
        throw 'error in source. Details: ' + error;
    })
    )
  }
  CreateUser(user:user){
    return this.http.post(`${this.url}/users`,user);
  }

  PatchForUser(id:number,partialUser: Partial<user>){
  return this.http.patch<user>(`${this.url}/users/${id}`, partialUser);
  }
  UpdatingAddressForUser(user:user){
    return this.http.put(`${this.url}/users/${user.id}`, user).subscribe({
      next:res=>console.log(res),
      error:err=> console.log(err)
  })
  }
  CheckUser(email:string,password:string){
   let result:boolean=false
    this.http.get<user[]>(`${this.url}/users`).subscribe(
      {
        next:users=>{
          if( users.find(user=>{user.email==email&&user.password==password})){
             result=true;
          }
        },
        error:err=>console.error(err)
      }
    )
    return result
  }

}
