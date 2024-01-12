import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSaveDialogComponent } from './member-save-dialog.component';

describe('MemberSaveDialogComponent', () => {
  let component: MemberSaveDialogComponent;
  let fixture: ComponentFixture<MemberSaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberSaveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
