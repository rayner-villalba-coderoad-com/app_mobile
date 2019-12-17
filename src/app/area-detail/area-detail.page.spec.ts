import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDetailPage } from './area-detail.page';

describe('AreaDetailPage', () => {
  let component: AreaDetailPage;
  let fixture: ComponentFixture<AreaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
