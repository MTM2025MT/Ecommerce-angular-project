import { UserService } from './../../../services/user-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink,OutletContext,Router } from '@angular/router';
import { user } from '../../../models/User.type';
@Component({
  selector: 'app-sign-in',
  standalone:true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
LoginginGroupForm:FormGroup;

  fb=inject(FormBuilder);
  UserService=inject(UserService)
  constructor(){

    this.LoginginGroupForm=this.fb.group(
      {

      email:this.fb.control('',[Validators.required,Validators.email]),
      password:this.fb.control('',[Validators.required,Validators.minLength(6),]),
      }
    )
  }
  onSubmit(){
   if(this.LoginginGroupForm.valid){
    const email=this.LoginginGroupForm.get("email")?.value;
     const password=this.LoginginGroupForm.get("password")?.value;
     this.UserService.CheckUser(email,password).subscribe({
      next:res=>console.log(res),
      error:err=>console.error(err)
     })
     this.LoginginGroupForm.reset();
     console.log(this.UserService.defaultUser())

   }
  }
}
