

import { catchError, lastValueFrom, Observable, single, subscribeOn } from 'rxjs';
import { UserService } from './../../services/user-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { OpenColseActionDirective } from '../../Directive/open-colse-action-directive';
import { user ,payment, Address} from '../../models/User.type';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule ,ValidatorFn, Validators,ValidationErrors,AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule,CommonModule , OpenColseActionDirective ],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
    UserService=inject(UserService)
    fb=inject(FormBuilder);
    PasswordChangeGroupForm!:FormGroup;
     AddingAddressGroupForm!:FormGroup;
     paymentGroupForm!:FormGroup;
     AccountdetailsGroupForm!:FormGroup;

    defaultUser= this.UserService.defaultUser
  defaultAdressForThisUser = signal<Address | null>(null);
  //store the edited or lasted edited address
   Editmode=signal({...this.defaultAdressForThisUser(),choice:false});
   Editmodepayment=signal(false);

    constructor(){
    }
    ngOnInit(): void {
        this.PasswordChangeGroupForm = this.fb.group({
        password:this.fb.control('', [Validators.required, Validators.minLength(6)]),
        NewPassword:this.fb.control('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      }, {
        validators: this.MustMatchPassWord // Use 'validators' instead of 'Validators'
      });
         this.AddingAddressGroupForm = this.fb.group({
                address: this.fb.control('', [
                  Validators.required,
                  Validators.minLength(6),
                  Validators.pattern(/^[A-Za-z0-9\s.,'-]+$/) // letters, numbers, spaces, . , ' -
                ]),
                city: this.fb.control('', [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.pattern(/^[A-Za-z\s'-]+$/) // only letters, spaces, hyphens, apostrophes
                ]),
                state: this.fb.control('', [
                  Validators.minLength(2),
                  Validators.pattern(/^[A-Za-z\s'-]+$/)
                ]),
                stateCode: this.fb.control('', [
                  Validators.pattern(/^[A-Z]{2}$/) // exactly 2 uppercase letters
                ]),
                postalCode: this.fb.control('', [
                  Validators.required,
                  Validators.minLength(4),
                  Validators.maxLength(5),
                  Validators.pattern(/^\d{4,5}$/) // 4–5 digits only
                ]),
                coordinates: this.fb.group({
                  lat: this.fb.control('', [
                    Validators.pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/) // valid latitude -90 to 90
                  ]),
                  lng: this.fb.control('', [
                    Validators.pattern(/^[-+]?((1[0-7]\d)|(\d{1,2}))(\.\d+)?|180(\.0+)?$/) // valid longitude -180 to 180
                  ])
                }),
                  country: this.fb.control('', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.pattern(/^[A-Za-z\s'-]+$/)
                ]),
                name:this.fb.control('',[
                    Validators.required,
                    Validators.minLength(3)
                ]),
                id:this.fb.control('' ,[
                Validators.maxLength(9)

                ])

     })
          this.paymentGroupForm = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-z\s'-]+$/) // Only letters, spaces, hyphen, apostrophe
      ]),

      cardNumber: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d{16}$/) // 16 digits only
      ]),
      cardExpire: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/) // MM/YY format
      ]),
      cvv: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/) // 3 or 4 digits
      ]),
      postalCode: this.fb.control('', [
        Validators.pattern(/^[A-Za-z0-9\s-]{4,10}$/) // Allow ZIP or postal codes (alphanumeric, 4–10 chars)
      ]),
      saveCard: this.fb.control(false)
    });

    this.AccountdetailsGroupForm = this.fb.group({
      FullName: this.fb.control((this.defaultUser().firstName+this.defaultUser().lastName), [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z'-]+$/) // Only letters, hyphen, apostrophe
      ]),
      email: this.fb.control(this.defaultUser().email, [
        Validators.required,
        Validators.email
      ]),
      phone: this.fb.control(this.defaultUser().phone, [
        Validators.required,
        Validators.pattern(/^\+?[1-9]\d{1,14}$/) // E.164 format
      ]),
      address: this.fb.control(this.defaultUser().addresses.length>0?this.defaultUser().addresses[0].address:'', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[A-Za-z0-9\s.,'-]+$/) // letters, numbers, spaces, . , ' -
      ]),
    });
    }

       paymentcompenentsubmit(){
       if(this.paymentGroupForm.valid){
          if(this.Editmodepayment()){
             const editedvalues=this.paymentGroupForm.getRawValue() as payment
             const payments=this.defaultUser().bank?.map(payment=>{
              if(payment.cardNumber==editedvalues.cardNumber){
                return editedvalues
              }
              else{
                return payment
              }
             })
              this.defaultUser.update(user => ({
              ...user,
              bank:payments
            }));
          }
          else{

            this.defaultUser.update(user => ({
              ...user,
              bank: [...user.bank, {...this.paymentGroupForm.value,id:Math.floor(Math.random() * 10000000).toString()}]
            }));
          }
        this.UserService.UpdatingUser(this.defaultUser())
         this.defaultUser=this.UserService.defaultUser
        this.paymentcompenenttoggle();
       }else{

        console.error("this form is not valid")
         console.error(this.paymentGroupForm.errors)
       }
       this.paymentGroupForm.reset();
      }
        RemovePayment(paymentitem:payment){
       this.defaultUser.update(user=>({
         ...user,
         bank: user.bank.filter(
          paymentcard=>(paymentitem.cardNumber!=paymentcard.cardNumber)
         )
        }
       ))

       this.UserService.UpdatingUser(this.defaultUser())
    }
   MustMatchPassWord: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('NewPassword')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        if (password !== confirmPassword) {
          console.log("password"+password+"confirmPassword"+confirmPassword+"match"+(password !== confirmPassword))
          return { MustMatch: true };
        }
        return null;
      };

    UpdatingPassword(){
      console.log(this.PasswordChangeGroupForm.value)
      const newpasswordPartial={ password:this.PasswordChangeGroupForm.controls["NewPassword"].value}
     if(this.PasswordChangeGroupForm.valid){
      if( this.PasswordChangeGroupForm.controls["password"].value==this.defaultUser().password){
        console.log("we reach the level of first step at service")
         this.defaultUser.update(user=>({
          ...user,
          password:this.PasswordChangeGroupForm.controls["NewPassword"].value
         }))
         console.log("the new password is "+this.defaultUser().password)
        this.UserService.UpdatingUser(this.defaultUser())
      }
      else{
        throw console.error("there is somting worng in that with cheaking password comper to new password ");

      }
     }
     else{

       throw console.error("this form is not valid"+this.PasswordChangeGroupForm.errors);

     }
     this.PasswordChangeGroupForm.reset()
    }

    EditAddressBtn(addressitem:Address){
      this.Editmode.update(
        lastedited=>{
          console.log("last id "+lastedited.id+" last name "+lastedited.name+" adderess item id "+addressitem.id+"  address name "+addressitem.name)
          if(lastedited.id===addressitem.id&&lastedited.name===addressitem.name){

              return {...lastedited ,choice:false}
          }
          else{
            return {...addressitem ,choice:true}
          }
        }
      )
     this.AddingAddressGroupForm.patchValue(addressitem);
     if (this.Editmode().choice) {
      this.AddingAddressGroupForm.get('id')?.disable();
        }
        else {
           this.AddingAddressGroupForm.get('id')?.enable();
         }
         console.log(this.Editmode())
    }

    OnSubmitAddress(){
      if(this.AddingAddressGroupForm.valid){
        if(!this.Editmode().choice){

          this.defaultUser.update(user=>(
            {
              ...user,
              addresses:[...user.addresses,this.AddingAddressGroupForm.value]
            }
          ))
          this.UserService.UpdatingUser(this.defaultUser())
          this.defaultUser=this.UserService.defaultUser
        }
        else{
      const editedaddress:Address=this.AddingAddressGroupForm.getRawValue() as Address;
      const addresses:Address[]=this.defaultUser().addresses.map(address=>
          {
          if(editedaddress.id ==address.id){
           return editedaddress

          } else {
            return address;
          }
         }

         )
         this.defaultUser.update(user=>({
          ...user,
          addresses:addresses
         }))

          this.UserService.UpdatingUser(this.defaultUser())
        }
      }
      else{
        console.error("the form of adding address  is not valid ");
      }
      this.AddingAddressGroupForm.reset()
    }
    RemoveAddress(addressitem:Address){
       this.defaultUser.update(user=>({
         ...user,
         addresses: user.addresses.filter(
          address=>(address.address!=addressitem.address)&&(address.city!=addressitem.city)
         )
        }
       ))

       this.UserService.UpdatingUser(this.defaultUser())
    }
    SetDefualt(addressitem:Address ){
       const AddressArray=this.defaultUser().addresses.map(address=>
          {
          if(addressitem.address===address.address){
            return { ...address, default : true };
          } else {
            return { ...address, default : false };
          }
         }

         )
       this.defaultUser.update( user=>({
         ...user,
         addresses:AddressArray
       })
       )

      this.UserService.UpdatingUser(this.defaultUser())

    }

    onEditPayment(payment:payment){
      this.paymentcompenenttoggle()
      this.paymentGroupForm.patchValue(payment);
      this.Editmodepayment.update(v=>!v)
    }


   PasswordCompenentLock = signal(false);
    passwordbolckopenertoggle() {
      this.PasswordCompenentLock.update(v=>!v);
    }
      RecentOrdersCompenentLock = signal(false);
    RecentOrdersLocktoggle() {
      this.RecentOrdersCompenentLock.update(v=>!v);
    }

    PreviousOrdersCompenentLock = signal(false);
      PreviousOrdersLocktoggle() {
        this.PreviousOrdersCompenentLock.update(v => !v);
      }
      SavedAddressesCompenentLock = signal(false);
      SavedAddressesLocktoggle() {
        this.SavedAddressesCompenentLock.update(v => !v);
      }
      AddingAddresslock=signal(false)
      AddingAddresstoggle(){
        this.AddingAddresslock.update(v=>!v)
      }


      SavedPaymentMethodsCompenentLock = signal(false);
      SavedPaymentMethodsLocktoggle() {
        this.SavedPaymentMethodsCompenentLock.update(v => !v);
      }
      paymentcompenentlocker=signal(false)
      paymentcompenenttoggle(){
        this.paymentGroupForm.reset();
        this.paymentcompenentlocker.update(v=>!v)

      }
      AccountdetailsGroupFormsubmit(){
        if(this.AccountdetailsGroupForm.valid){
          const updatedUserPartial={
            firstName:this.AccountdetailsGroupForm.controls["FullName"].value.split(" ")[0],
            lastName:this.AccountdetailsGroupForm.controls["FullName"].value.split(" ")[1],
            email:this.AccountdetailsGroupForm.controls["email"].value,
            phone:this.AccountdetailsGroupForm.controls["phone"].value,
          }
          this.UserService.PatchForUser(this.defaultUser().id,updatedUserPartial).subscribe({
            next:res=>console.log(res),
            error:err=>console.log(err)
          })
        }else{
          console.error("this form is not valid")
           console.error(this.AccountdetailsGroupForm.errors)
         }
      }

}
