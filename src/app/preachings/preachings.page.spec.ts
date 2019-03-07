import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreachingsPage } from './preachings.page';

describe('PreachingsPage', () => {
  let component: PreachingsPage;
  let fixture: ComponentFixture<PreachingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreachingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreachingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
