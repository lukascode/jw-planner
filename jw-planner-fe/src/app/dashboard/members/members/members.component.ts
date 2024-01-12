import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MemberSaveDialogComponent} from '../member-save-dialog/member-save-dialog.component'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(MemberSaveDialogComponent, {minWidth: '720px', data: {memberId: 4}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed`);
    });
  }
}
