import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingProgramComponent } from './meeting-program.component';

describe('MeetingProgramComponent', () => {
  let component: MeetingProgramComponent;
  let fixture: ComponentFixture<MeetingProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
