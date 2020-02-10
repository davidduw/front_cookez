import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateRecipePage } from './modal-create-recipe.page';

describe('ModalCreateRecipePage', () => {
  let component: ModalCreateRecipePage;
  let fixture: ComponentFixture<ModalCreateRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateRecipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
