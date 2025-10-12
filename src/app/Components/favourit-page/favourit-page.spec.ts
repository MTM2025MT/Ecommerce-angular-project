import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritPage } from './favourit-page';

describe('FavouritPage', () => {
  let component: FavouritPage;
  let fixture: ComponentFixture<FavouritPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouritPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
