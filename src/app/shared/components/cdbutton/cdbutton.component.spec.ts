import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdbuttonComponent } from './cdbutton.component';

describe('CdbuttonComponent', () => {
  let component: CdbuttonComponent;
  let fixture: ComponentFixture<CdbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
