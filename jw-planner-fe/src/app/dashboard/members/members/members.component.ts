import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MemberSaveDialogComponent} from '../member-save-dialog/member-save-dialog.component';
import {MemberSnapshot} from '../members.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {MemberService} from '../members.service';
import {WarnDialogComponent} from '../../../shared/components/warn-dialog/warn-dialog.component';
import {AlertService} from 'ngx-alerts';
import {Utils} from '../../../shared/utils/utils';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'responsibilities', 'actions'];
  members: Subject<MemberSnapshot[]> = new BehaviorSubject<MemberSnapshot[]>([]);
  processing = false;

  constructor(public dialog: MatDialog,
              private memberService: MemberService,
              private alert: AlertService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  add(): void {
    this.openSaveDialog();
  }

  edit(id: number): void {
    this.openSaveDialog(id);
  }

  delete(id: number) {
    WarnDialogComponent.open(this.dialog, 'Czy jesteś pewny, że chcesz usunąć tego uczestnika?').subscribe(result => {
      if (result) {
        this.memberService.deleteMember(id).subscribe(() => {
          this.alert.success('Zapisano pomyślnie');
          this.fetchData();
        });
      }
    });
  }

  prepareResponsibilities(responsibilities: string[]): string[] {
    return responsibilities.map(r => r.split(':')[1]);
  }

  private fetchData(): void {
    this.processing = true;
    this.memberService.getAllMembers().subscribe(result => {
      this.members.next(Utils.getMembers(result.filter(m => !m.external), []));
      this.processing = false;
    });
  }

  private openSaveDialog(id?: number): void {
    const dialogRef = this.dialog.open(MemberSaveDialogComponent, {panelClass: 'member-save-dialog', data: {memberId: id}});
    dialogRef.afterClosed().subscribe(memberId => {
      console.log('MemberSaveDialog closed', memberId);
      this.fetchData();
    });
  }
}
