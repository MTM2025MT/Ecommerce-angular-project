

import { Component, inject, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
@Component({
  selector: 'app-main',
  imports: [RouterOutlet,Navbar],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main {

}
