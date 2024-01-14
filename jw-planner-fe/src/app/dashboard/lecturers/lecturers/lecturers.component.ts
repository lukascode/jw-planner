import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {MemberSnapshot} from '../../members/members.model';
import {MatDialog} from '@angular/material/dialog';
import {MemberService} from '../../members/members.service';
import {AlertService} from 'ngx-alerts';
import {WarnDialogComponent} from '../../../shared/components/warn-dialog/warn-dialog.component';
import {MemberSaveDialogComponent} from '../../members/member-save-dialog/member-save-dialog.component';

@Component({
  selector: 'app-lecturers',
  templateUrl: './lecturers.component.html',
  styleUrls: ['./lecturers.component.scss']
})
export class LecturersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'external', 'actions'];
  members: Subject<MemberSnapshot[]> = new BehaviorSubject<MemberSnapshot[]>([]);

  constructor(public dialog: MatDialog,
              private memberService: MemberService,
              private alert: AlertService) { }

  ngOnInit() {
    this.fetchData();
  }

  add() {
    this.openSaveDialog();
  }

  edit(id: number) {
    this.openSaveDialog(id);
  }

  delete(id: number) {
    WarnDialogComponent.open(this.dialog, 'Czy jesteś pewny, że chcesz usunąć tego mówcę?').subscribe(result => {
      if (result) {
        this.memberService.deleteMember(id).subscribe(() => {
          this.alert.success('Zapisano pomyślnie');
          this.fetchData();
        });
      }
    });
  }

  private fetchData() {
    this.memberService.getMembers(['MOWCA']).subscribe(result => {
      this.members.next(result);
    });
  }

  private openSaveDialog(id?: number) {
    const dialogRef = this.dialog.open(MemberSaveDialogComponent, {minWidth: '720px', data: {memberId: id, lecturer: true}});
    dialogRef.afterClosed().subscribe(memberId => {
      console.log('MemberSaveDialog closed', memberId);
      this.fetchData();
    });
  }
}
