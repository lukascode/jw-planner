import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSaveDialogComponent } from './group-save-dialog.component';

describe('GroupSaveDialogComponent', () => {
  let component: GroupSaveDialogComponent;
  let fixture: ComponentFixture<GroupSaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSaveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
