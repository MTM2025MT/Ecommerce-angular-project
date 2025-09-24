import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.type';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(ListOfProducts: Product[], ValueOfSearch:string): Product[] | null {
    if(!ListOfProducts || !ValueOfSearch){
      return ListOfProducts;
    }
    return ListOfProducts.filter(product =>
      product.title.toLowerCase().includes(ValueOfSearch.toLowerCase())
    );

  }

}
