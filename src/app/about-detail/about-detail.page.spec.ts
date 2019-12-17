import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDetailPage } from './about-detail.page';

describe('AboutDetailPage', () => {
  let component: AboutDetailPage;
  let fixture: ComponentFixture<AboutDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
