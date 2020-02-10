import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieRecettesPage } from './categorie-recettes.page';

describe('CategorieRecettesPage', () => {
  let component: CategorieRecettesPage;
  let fixture: ComponentFixture<CategorieRecettesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieRecettesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieRecettesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
