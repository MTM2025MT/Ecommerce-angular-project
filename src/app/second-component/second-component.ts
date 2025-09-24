import { Component } from '@angular/core';

@Component({
  selector: 'app-second-component',
  imports: [],
  templateUrl: './second-component.html',
  styleUrl: './second-component.css'
})

export class SecondComponent {

    items: Product[] = [
    { id: 1, name: 'item1', price: 100 },
    { id: 2, name: 'item2', price: 200 },
    { id: 3, name: 'item3', price: 900 },
    { id: 4, name: 'item3', price: 300 },
    { id: 5, name: 'item3', price: 700 },
    { id: 6, name: 'item3', price: 644},
   { id: 7, name: 'item3', price: 100 },
  ];
}

interface Product {
  id: number;
  name: string;
  price: number;
}


