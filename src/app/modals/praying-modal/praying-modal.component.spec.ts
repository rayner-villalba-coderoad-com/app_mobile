import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayingModalPage } from './praying-modal.page';

describe('PrayingModalPage', () => {
  let component: PrayingModalPage;
  let fixture: ComponentFixture<PrayingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayingModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
