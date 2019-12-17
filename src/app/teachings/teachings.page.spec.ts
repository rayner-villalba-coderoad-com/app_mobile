import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingsPage } from './teachings.page';

describe('TeachingsPage', () => {
  let component: TeachingsPage;
  let fixture: ComponentFixture<TeachingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
