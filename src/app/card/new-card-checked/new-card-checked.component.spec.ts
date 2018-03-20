import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardCheckedComponent } from './new-card-checked.component';

describe('NewCardCheckedComponent', () => {
  let component: NewCardCheckedComponent;
  let fixture: ComponentFixture<NewCardCheckedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCardCheckedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCardCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
