import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loging } from './loging';

describe('Loging', () => {
  let component: Loging;
  let fixture: ComponentFixture<Loging>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loging]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loging);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
