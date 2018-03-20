import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnbindCardComponent } from './unbind-card.component';

describe('UnbindCardComponent', () => {
  let component: UnbindCardComponent;
  let fixture: ComponentFixture<UnbindCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnbindCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnbindCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
