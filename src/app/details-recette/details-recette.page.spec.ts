import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecettePage } from './details-recette.page';

describe('DetailsRecettePage', () => {
  let component: DetailsRecettePage;
  let fixture: ComponentFixture<DetailsRecettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsRecettePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRecettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
