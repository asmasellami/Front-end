import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParfumComponent } from './add-parfum.component';

describe('AddParfumComponent', () => {
  let component: AddParfumComponent;
  let fixture: ComponentFixture<AddParfumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParfumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParfumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
