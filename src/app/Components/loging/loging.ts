import { UserService } from './../../services/user-service';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink,OutletContext } from '@angular/router';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-loging',

  imports: [ReactiveFormsModule, RouterOutlet],
  templateUrl: './loging.html',
  styleUrl: './loging.css'
})
export class Loging {
  UserService=inject(UserService)

  constructor(){
    this.UserService.CheckUser("michael.williams@x.dummyjson.com","12341234")
  }
}
