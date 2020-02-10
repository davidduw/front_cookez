import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRecetteListePage } from './creation-recette-liste.page';

describe('CreationRecetteListePage', () => {
  let component: CreationRecetteListePage;
  let fixture: ComponentFixture<CreationRecetteListePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationRecetteListePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationRecetteListePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
