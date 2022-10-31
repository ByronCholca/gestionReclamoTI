import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeclaimComponent } from './typeclaim.component';

describe('TypeclaimComponent', () => {
  let component: TypeclaimComponent;
  let fixture: ComponentFixture<TypeclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeclaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
