import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngletsPage } from './onglets.page';

describe('ongletsPage', () => {
  let component: OngletsPage;
  let fixture: ComponentFixture<OngletsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OngletsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngletsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
