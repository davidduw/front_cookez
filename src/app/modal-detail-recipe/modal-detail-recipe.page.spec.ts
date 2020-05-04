import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule
} from '@angular/common/http/testing';

import { ModalDetailRecipePage } from './modal-detail-recipe.page';
import { ModalController, NavParams } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

class ActivatedRouteMock {
  queryParams = new Observable(observer => {
    const urlParams = {
      param1: 'some',
      param2: 'params'
    }
    observer.next(urlParams);
    observer.complete();
  });
}

class NavParamMock {
  data = {
  };

  get(param){
    return this.data[param];
  }
}

class HttpMock {
  getData: () => {}
}



describe('ModalDetailRecipePage', () => {
  let component: ModalDetailRecipePage;
  let fixture: ComponentFixture<ModalDetailRecipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
      providers: [{ provide: Router },{provide: HttpClient, useClass: HttpMock}, {provide: NavParams, useClass: NavParamMock}, { provide: ModalController}, {
        provide: ActivatedRoute,
        useClass: ActivatedRouteMock
      }],
      declarations: [ ModalDetailRecipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetailRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
