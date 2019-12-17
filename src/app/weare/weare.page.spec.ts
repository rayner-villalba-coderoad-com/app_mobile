import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WearePage } from './weare.page';

describe('WearePage', () => {
  let component: WearePage;
  let fixture: ComponentFixture<WearePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WearePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WearePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
