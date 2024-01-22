import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../members.service';
import { Observable } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Gender} from '../members.model';
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
  lecturer = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {memberId?: number, lecturer?: boolean},
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<MemberSaveDialogComponent>,
    private alert: AlertService) {
    if (data && data.lecturer) {
      this.lecturer = data.lecturer;
    }
    this.createForm(formBuilder);
    if (data && data.memberId) {
      this.memberId = data.memberId;
      this.fillForm();
    }
  }

  private createForm(formBuilder: FormBuilder): void {
    const initialResponsibilities = [];
    let initialGender = '';
    if (this.lecturer) {
      initialResponsibilities.push('MOWCA');
      initialGender = Gender.MALE;
    }
    this.memberSaveForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [initialGender, Validators.required],
      email: [''],
      phoneNumber: [''],
      address: [''],
      additionalInformation: [''],
      external: [false],
      responsibilities: [initialResponsibilities]
    });
  }

  private fillForm(): void {
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

  ngOnInit(): void {
    this.responsibilities = this.memberService.getResponsibilities();
  }

  save(): void {
    this.memberService.saveMember(this.memberSaveForm.value, this.memberId)
    .subscribe(id => {
      this.dialogRef.close(id);
      this.alert.success('Zapisano pomyślnie');
    });
  }
}
