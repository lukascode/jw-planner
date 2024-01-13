import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-warn-dialog',
  templateUrl: './warn-dialog.component.html',
  styleUrls: ['./warn-dialog.component.scss']
})
export class WarnDialogComponent {

  msg: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: {msg: string}) {
    this.msg = data.msg;
  }

  static open(dialog: MatDialog, msg: string): Observable<boolean> {
    const dialogRef = dialog.open(WarnDialogComponent, {minWidth: '480px', data: {msg: msg}});
    return dialogRef.afterClosed();
  }
}
