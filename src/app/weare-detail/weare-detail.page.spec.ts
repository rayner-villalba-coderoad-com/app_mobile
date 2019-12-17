import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeareDetailPage } from './weare-detail.page';

describe('WeareDetailPage', () => {
  let component: WeareDetailPage;
  let fixture: ComponentFixture<WeareDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeareDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeareDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
