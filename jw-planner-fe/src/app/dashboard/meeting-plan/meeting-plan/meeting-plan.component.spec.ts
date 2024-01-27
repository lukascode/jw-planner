import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingPlanComponent } from './meeting-plan.component';

describe('MeetingPlanComponent', () => {
  let component: MeetingPlanComponent;
  let fixture: ComponentFixture<MeetingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
