import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.type';
@Pipe({
  name: 'filterbestwenty'
})
export class FilterbestwentyPipe implements PipeTransform {

  transform(ListOfProducts: Product[], ...args: unknown[]): Product[] {
  const items=  [...ListOfProducts].sort(
      (p1,p2)=>p2.rating.rate-p1.rating.rate
     ).slice(0,20);

     return items.map((p, i) => ({ ...p, index: i }))
  }

}
