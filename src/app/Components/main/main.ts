
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink,OutletContext } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
@Component({
  selector: 'app-main',
  imports: [ReactiveFormsModule,RouterOutlet,Navbar],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
