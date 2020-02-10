import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilRecettePage } from './accueil-recette.page';

describe('AccueilRecettePage', () => {
  let component: AccueilRecettePage;
  let fixture: ComponentFixture<AccueilRecettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilRecettePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilRecettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
