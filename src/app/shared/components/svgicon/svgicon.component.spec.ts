import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgiconComponent } from './svgicon.component';

describe('SvgiconComponent', () => {
  let component: SvgiconComponent;
  let fixture: ComponentFixture<SvgiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
