import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRecettePage } from './creation-recette.page';

describe('CreationRecettePage', () => {
  let component: CreationRecettePage;
  let fixture: ComponentFixture<CreationRecettePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreationRecettePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationRecettePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
