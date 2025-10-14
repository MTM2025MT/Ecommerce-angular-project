import { UserService } from './../../services/user-service';
import { CartService } from './../../services/cart-service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OrderingProcess } from '../../services/ordering-process';
import { order } from '../../models/Order.type';
@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {
 CartService=inject(CartService)
 UserService=inject(UserService)
 OrderingProcess=inject(OrderingProcess)
 fb=inject(FormBuilder)
 OrderForm!:FormGroup

  constructor(){

    const defaultAddress=this.UserService.defaultUser().addresses.find(address=>address.default);
    const defaultPayment=this.UserService.defaultUser().bank[0];
    this.OrderForm=this.fb.group({
      address:this.fb.control(defaultAddress,[Validators.required]),
      payment:this.fb.control(defaultPayment,[Validators.required]),
      notes:this.fb.control(''),
    })
  }
 getUserAddresses(){
  return this.UserService.defaultUser().addresses;
 }
 getUserPayments(){
  return this.UserService.defaultUser().bank;
 }
 onSubmit(){
  if(this.OrderForm.valid){
    console.log(this.OrderForm.value);
    const order:order={
      id:Math.floor(Math.random() * 1000000),
      order_number:Math.floor(Math.random() * 1000000),
      user_id:this.UserService.defaultUser().id,
      cart_id:(this.CartService.Cart().id),
      address_id:this.OrderForm.value.address.id,
      status:"pending",
      total:this.CartService.Cart().total,
      currency: "USD",
      payment_method: "credit_card",
      saved_payment:this.OrderForm.value.payment.id,
      Note:this.OrderForm.value.notes,
      created_at: new Date().toISOString(),
      card:this.CartService.Cart()
    }
    this.CartService.DeleteTheCart();
    this.OrderingProcess.createOrder(order);
    this.OrderForm.reset();
  }else{
    this.validateAllFormFields(this.OrderForm);
  }
 }
 validateAllFormFields(OrderForm: FormGroup) {
  if(OrderForm.valid){
    const formData = this.OrderForm.value;
    console.log(formData);
  }
 }

}
