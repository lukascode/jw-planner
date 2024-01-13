import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupService} from '../groups.service';
import {AlertService} from 'ngx-alerts';
import {Observable} from 'rxjs';
import {MemberSnapshot} from '../../members/members.model';
import {MemberService} from '../../members/members.service';

@Component({
  selector: 'app-group-save-dialog',
  templateUrl: './group-save-dialog.component.html',
  styleUrls: ['./group-save-dialog.component.scss']
})
export class GroupSaveDialogComponent implements OnInit {

  groupId?: number;
  groupSaveForm: FormGroup;
  members: Observable<MemberSnapshot[]>;

  constructor(@Inject(MAT_DIALOG_DATA) data: {groupId?: number},
              private groupService: GroupService,
              private memberService: MemberService,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<GroupSaveDialogComponent>,
              private alert: AlertService) {
    this.createForm(formBuilder);
    if (data && data.groupId) {
      this.groupId = data.groupId;
      this.fillForm();
    }
  }

  ngOnInit() {
    this.members = this.memberService.getMembers(['STARSZY']);
  }

  save() {
    this.groupService.saveGroup(this.groupSaveForm.value, this.groupId)
      .subscribe(id => {
        this.dialogRef.close(id);
        this.alert.success('Zapisano pomyślnie');
      });
  }

  private createForm(formBuilder: FormBuilder) {
    this.groupSaveForm = formBuilder.group({
      name: ['', Validators.required],
      supervisorId: [null, Validators.required]
    });
  }

  private fillForm() {
    this.groupService.getGroup(this.groupId as number).subscribe(group => {
      this.groupSaveForm.patchValue({
        name: group.name,
        supervisorId: group.supervisorId
      });
    });
  }
}
