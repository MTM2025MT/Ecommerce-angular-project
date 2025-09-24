import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-first-component',
  imports: [ReactiveFormsModule],
  templateUrl: './first-component.html',
  styleUrl: './first-component.css'
})
export class FirstComponent {//FirstApp/src/app/first-component/first-component.html
  Groupform:FormGroup;
  fb=inject(FormBuilder);
  constructor(){
    this.Groupform=this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(3)]],
      lastname:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      age:['',[Validators.required,Validators.min(18),Validators.max(60)]],
      password:['',[Validators.required,Validators.minLength(6),]],
      confirmPassword:['']
    },{ Validators: this.MustMatchPassWord })
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
    if(this.Groupform.valid){
      console.log(this.Groupform.value);
    }else{
      this.validateAllFormFields(this.Groupform);
    }
    this.Groupform.reset();

}
 validateAllFormFields(Groupform: FormGroup) {
    if(Groupform.valid){
      const formData = this.Groupform.value;
      console.log(formData);
    }
  }
}

