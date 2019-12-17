import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpapersPage } from './wallpapers.page';

describe('WallpapersPage', () => {
  let component: WallpapersPage;
  let fixture: ComponentFixture<WallpapersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallpapersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallpapersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
