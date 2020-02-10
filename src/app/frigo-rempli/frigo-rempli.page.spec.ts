import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrigoRempliPage } from './frigo-rempli.page';

describe('FrigoRempliPage', () => {
  let component: FrigoRempliPage;
  let fixture: ComponentFixture<FrigoRempliPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrigoRempliPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrigoRempliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
