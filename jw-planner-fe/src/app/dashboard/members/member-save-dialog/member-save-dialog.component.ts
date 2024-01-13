import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../members.service';
import { Observable } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MemberSnapshot } from '../members.model';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-member-save-dialog',
  templateUrl: './member-save-dialog.component.html',
  styleUrls: ['./member-save-dialog.component.scss']
})
export class MemberSaveDialogComponent implements OnInit {

  memberId?: number;
  memberSaveForm: FormGroup;
  responsibilities: Observable<string[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {memberId?: number},
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MemberSaveDialogComponent>,
    private alert: AlertService) {
    this.createForm(formBuilder);
    if (data && data.memberId) {
      this.memberId = data.memberId;
      this.fillForm();
    }
  }

  private createForm(formBuilder: FormBuilder) {
    this.memberSaveForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: [''],
      phoneNumber: [''],
      address: [''],
      additionalInformation: [''],
      external: [false],
      responsibilities: [[]]
    });
  }

  private fillForm() {
    this.memberService.getMember(this.memberId as number).subscribe(member => {
      this.memberSaveForm.patchValue({
        firstName: member.firstName,
        lastName: member.lastName,
        gender: member.gender,
        email: member.email,
        phoneNumber: member.phoneNumber,
        address: member.address,
        additionalInformation: member.additionalInformation,
        external: member.external,
        responsibilities: member.responsibilities.map(r => r.split(':')[0])
      });
    });
  }

  ngOnInit() {
    this.responsibilities = this.memberService.getResponsibilities();
  }

  save() {
    this.memberService.saveMember(this.memberSaveForm.value, this.memberId)
    .subscribe(id => {
      this.dialogRef.close(id);
      this.alert.success('Zapisano pomyślnie');
    });
  }
}
