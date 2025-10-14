
import { Injectable, OnInit ,inject, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {user} from '../models/User.type'
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs';
import { Address } from '../models/User.type';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    router=inject(Router)
    http:HttpClient=inject(HttpClient);
    url=environment.apiUrl
    userdidsigned=signal(false)
defaultUser =signal<user>( {
  id: 0,
  firstName: "",
  lastName: "",
  maidenName: "",
  age: 0,
  gender: "male",
  email: "defualt@example.com",
  phone: "+0000000000",
  password: "defualtpassword",
  birthDate: "2000-05-15",
  image: "https://randomuser.me/api/portraits/men/45.jpg",
  addresses: [],
  bank:[],
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  role: "user",
  favourite:[]
});

  getUsers(){

    return this.http.get<user[]>(`${this.url}/users`).pipe(
    catchError(error => {
        console.log(error);
        throw 'error in source. Details: ' + error;
    })
    )
  }
  CreateUser(userobj:user){
    const user={...this.defaultUser(),...userobj}
    return this.http.post(`${this.url}/users`,user);
  }

  PatchForUser(partialUser: Partial<user>){
    this.defaultUser.update(prev => ({...prev, ...partialUser}));
   return this.http.put(`${this.url}/users/${this.defaultUser().id}`, this.defaultUser());
  }
  UpdatingUser(user:user){
    return this.http.put(`${this.url}/users/${user.id}`, user).subscribe({
      next:res=>console.log(res),
      error:err=> console.log(err)
  })
  }
  updatinguser(){
    return this.http.put(`${this.url}/users/${this.defaultUser().id}`, this.defaultUser()).subscribe({
      next:res=>console.log(res),
      error:err=> console.log(err)
  })
  }
  CheckUser(email:string,password:string){

   const domatch=  this.http.get<user[]>(`${this.url}/users`).pipe(
    map(users => {
      console.log(users)
       console.log(email+"   "+password)
        return users.some(user => user.email == email && user.password == password);
    })
   )
  if(domatch){
  const mathceduserobservable = this.http.get<user[]>(`${this.url}/users`).pipe(
   map(users => users.find(user => user.email === email && user.password === password)),
   catchError(error => {
    console.error('Error fetching matched user:', error);
    throw error;
   })
  )
   mathceduserobservable.subscribe({
    next:res=>{
      if(res !=undefined){
      this.defaultUser.set(res)
      this.userdidsigned.update(v=>!v)
      console.log("the user is now "+this.defaultUser().firstName+"and it is id is "+this.defaultUser().id)
       this.router.navigate(['/main'])
      }
      else
        throw console.error("the user was undefined ");
    },
    error:err=>{
      console.error(err)
    }
   })

  }
   return domatch
  }
  favouritebtn(id:string){
    const currentFavourites = this.defaultUser().favourite;
    if(!currentFavourites){
      return console.error("there is something went wrong in importing the favourite ")
    }
    const index = currentFavourites.indexOf(id);

    if(index === -1){
      // Add to favourites
      this.defaultUser.update(prev => ({...prev, favourite: [...prev.favourite, id]}));
    }
    else{
      // Remove from favourites
      const newFavourite = currentFavourites.filter(prev => prev !== id);
      this.defaultUser.update(prev => ({...prev, favourite: newFavourite}));
    }
  }

}
/**
 *     map(users=>{
        if( users.find(user=>{ return user.email===email&&user.password===password})){
           return true;
          }
    }
    )
 */
