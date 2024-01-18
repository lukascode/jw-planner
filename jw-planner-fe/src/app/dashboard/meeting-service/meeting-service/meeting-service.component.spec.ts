import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingServiceComponent } from './meeting-service.component';

describe('MeetingServiceComponent', () => {
  let component: MeetingServiceComponent;
  let fixture: ComponentFixture<MeetingServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
