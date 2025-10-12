import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingCart } from './shoping-cart';

describe('ShopingCart', () => {
  let component: ShopingCart;
  let fixture: ComponentFixture<ShopingCart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopingCart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopingCart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
