import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistriesPage } from './ministries.page';

describe('MinistriesPage', () => {
  let component: MinistriesPage;
  let fixture: ComponentFixture<MinistriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinistriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
