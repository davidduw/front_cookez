import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrigoPage } from './frigo.page';

describe('FrigoPage', () => {
  let component: FrigoPage;
  let fixture: ComponentFixture<FrigoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrigoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
