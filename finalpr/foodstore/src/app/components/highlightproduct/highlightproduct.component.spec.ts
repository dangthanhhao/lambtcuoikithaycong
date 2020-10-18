import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightproductComponent } from './highlightproduct.component';

describe('HighlightproductComponent', () => {
  let component: HighlightproductComponent;
  let fixture: ComponentFixture<HighlightproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
