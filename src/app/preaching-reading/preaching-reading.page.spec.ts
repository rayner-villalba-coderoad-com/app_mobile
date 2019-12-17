import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreachingReadingPage } from './preaching-reading.page';

describe('PreachingReadingPage', () => {
  let component: PreachingReadingPage;
  let fixture: ComponentFixture<PreachingReadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreachingReadingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreachingReadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
