import { UserService } from './../../services/user-service';
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
  UserService=inject(UserService)
  router =inject(Router);

  ProductService=inject(ProductService)
  CartService=inject(CartService);
  wantedquentity=signal(1);
  productItem = signal<Product | undefined>(undefined)
      favourite=signal(this.UserService.defaultUser().favourite)
      Favouritebtn =(productid:string)=> {
      this.UserService.favouritebtn(productid)
      this.favourite.update(prev=>[...this.UserService.defaultUser().favourite])
    }
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
       this.ProductService.getproduct(Number(ProductId)).subscribe({
        next: product => {
          if (product === undefined) {
            console.error("product is undefined");
            return;
          }
          this.productItem.set(product);
          console.log(this.productItem());
        },
        error: err => {
          console.error("Error fetching product:", err);
        }
      });

    }
    )
  }
  AddToCard(){
    const product = this.productItem();
    if (product) {
      this.CartService.addToCart(product, this.quantity);
      this.router.navigate(['/shoping-cart']);
    }
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  stars = computed(() => {
  const product = this.productItem();
  if (product) {
    const rounded = Math.round(product.rating?.rate ?? 0);
    return Array.from({ length: 5 }, (_, i) => i < rounded);
  }
  return [0]
});
}
