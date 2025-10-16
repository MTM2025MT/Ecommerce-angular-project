import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.type';
@Pipe({
  name: 'filterFeature'
})
export class FilterFeaturePipe implements PipeTransform {

  transform(ListOfProducts: Product[], feature: string): Product[] {
    if (!ListOfProducts || !feature) {
      return ListOfProducts;
    }
    if (feature !== 'topRated') {

          const items=  [...ListOfProducts].sort(
          (p1,p2)=>p2.rating-p1.rating
          ).slice(0,20);
          return items.map((p, i) => ({ ...p, index: i }))
    }
    //  else if(feature ==""){
    //   const items=  [...ListOfProducts].sort(
    //     (p1,p2)=>p2.
    //     ).slice(0,20);
    //     return items.map((p, i) => ({ ...p, index: i }))
    // }
    else{
      const items=  [...ListOfProducts].sort(
        (p1,p2)=>p2.price-p1.price
        ).slice(0,20);
        return items.map((p, i) => ({ ...p, index: i }))
    }


  }

}
