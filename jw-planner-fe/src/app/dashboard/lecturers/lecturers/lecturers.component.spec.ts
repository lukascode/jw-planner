import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturersComponent } from './lecturers.component';

describe('LecturersComponent', () => {
  let component: LecturersComponent;
  let fixture: ComponentFixture<LecturersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
