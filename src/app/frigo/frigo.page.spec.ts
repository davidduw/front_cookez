import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';

import { FrigoPage } from './frigo.page';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

class MockStorage {
  private internal = [];
  public get(key: string): Promise<any> {
    let getval = this.internal[key];
    return new Promise(function (resolve: Function): void {
      resolve(getval);
    });
  }
}

describe('FrigoPage', () => {
  let component: FrigoPage;
  let fixture: ComponentFixture<FrigoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [{
        provide: Storage, useClass: MockStorage
      }, { provide: Router }, { provide: HttpClient }, { provide: ModalController}],
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
