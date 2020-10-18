import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopproductComponent } from './topproduct.component';

describe('TopproductComponent', () => {
  let component: TopproductComponent;
  let fixture: ComponentFixture<TopproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
