import { CartService } from './services/cart-service';
import { environment } from './../environments/environment.development';
import { Component, HostListener, inject, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './Components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
   CartService=inject(CartService)
  constructor() {
    console.log('Environment:', environment
    );
    }

  }




