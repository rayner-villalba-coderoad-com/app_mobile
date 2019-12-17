import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeareInformationPage } from './weare-information.page';

describe('WeareInformationPage', () => {
  let component: WeareInformationPage;
  let fixture: ComponentFixture<WeareInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeareInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeareInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
