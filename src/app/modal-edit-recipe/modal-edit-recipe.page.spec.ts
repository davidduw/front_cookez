import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditRecipePage } from './modal-edit-recipe.page';

describe('ModalEditRecipeComponent', () => {
  let component: ModalEditRecipePage;
  let fixture: ComponentFixture<ModalEditRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditRecipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
