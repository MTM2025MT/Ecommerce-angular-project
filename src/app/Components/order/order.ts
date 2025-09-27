import { UserService } from './../../services/user-service';
import { CartService } from './../../services/cart-service';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {
 CartService=inject(CartService)
 UserService=inject(UserService)

 getUserAddresses(){
  return this.UserService.defaultUser().addresses;
 }
 getUserPayments(){
  return this.UserService.defaultUser().bank;
 }

}
