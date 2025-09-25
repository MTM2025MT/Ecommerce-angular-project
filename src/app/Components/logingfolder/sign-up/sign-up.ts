import { UserService } from './../../../services/user-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink,OutletContext } from '@angular/router';
import { user } from '../../../models/User.type';
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  LogingGroupForm:FormGroup;
  fb=inject(FormBuilder);
  UserService=inject(UserService)
  constructor(){

this.LogingGroupForm = this.fb.group({
  firstName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
  lastName: this.fb.control('', [Validators.required, Validators.minLength(3)]),
  email: this.fb.control('', [Validators.required, Validators.email]),
  age: this.fb.control('', [Validators.required, Validators.min(18), Validators.max(60)]),
  password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
  confirmPassword: this.fb.control('')
}
);
  }
      MustMatchPassWord(group:FormGroup){

    const password=group.controls['password'].value;
    const confirmPassword=group.controls['confirmPassword'].value;
    if(password!==confirmPassword){
      group.controls['confirmPassword'].setErrors({MustMatch:true});
    }else{
      group.controls['confirmPassword'].setErrors(null);
    }

  }
    onSubmit(){
    if(this.LogingGroupForm.valid){
      const id = Math.floor(Math.random() * 1000000);
      this.UserService.CreateUser({...this.LogingGroupForm.value,id:id}).subscribe({
        next:res=>console.log(res),
        error:err=>console.error(err)
      })
    }else{
      this.validateAllFormFields(this.LogingGroupForm);
    }
    this.LogingGroupForm.reset();

}

validateAllFormFields(LogingGroupForm: FormGroup) {
        if(LogingGroupForm.valid){
          const formData = this.LogingGroupForm.value;
          console.log(formData);
        }
      }
}
