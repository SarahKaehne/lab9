import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewnfComponent } from './viewnf.component';

describe('ViewnfComponent', () => {
  let component: ViewnfComponent;
  let fixture: ComponentFixture<ViewnfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewnfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewnfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
