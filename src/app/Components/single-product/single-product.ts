import { CartService } from './../../services/cart-service';
import { ProductService } from './../../services/product-service';
import { Product } from './../../models/product.type';
import { ActivatedRoute ,Router} from '@angular/router';
import { routes } from './../../app.routes';
import { Component, inject, OnInit, signal ,computed} from '@angular/core';
import { single } from 'rxjs';
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-single-product',
  imports: [ɵInternalFormsSharedModule,FormsModule],
  templateUrl: './single-product.html',
  styleUrl: './single-product.css'
})
export class SingleProduct implements OnInit {
  activatedroute=inject(ActivatedRoute);
  router =inject(Router);
  ProductService=inject(ProductService)
  CartService=inject(CartService);
  defuletproduct:Product=this.ProductService.defuletproduct
  wantedquentity=signal(1);
  productItem=signal<Product>(this.defuletproduct)

  imageurl:string='foto.jpg';
      get quantity() {
      return this.wantedquentity();
    }

    set quantity(value: number) {
      this.wantedquentity.set(value);
    }
   ngOnInit(): void {
     this.getProductById();
   }

  getProductById() {

    this.activatedroute.params.subscribe(param=>{
       const ProductId=param['id']
        this.ProductService.getproduct(ProductId).subscribe(product => {
          this.productItem.set(product ? product[0] : this.defuletproduct);
          console.log(this.productItem());
        });
      }

    )

  }
  AddToCard(){
    this.CartService.addToCart(this.productItem(),this.quantity);
    this.router.navigate(['/shoping-cart']);
  }//you should ask if the sended will be signal there or the value of the signal
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  stars = computed(() => {
  const rounded = Math.round(this.productItem().rating.rate);
  return Array.from({ length: 5 }, (_, i) => i + 1 <= rounded);
});
}
