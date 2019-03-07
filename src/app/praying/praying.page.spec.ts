import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayingPage } from './praying.page';

describe('PrayingPage', () => {
  let component: PrayingPage;
  let fixture: ComponentFixture<PrayingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrayingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
