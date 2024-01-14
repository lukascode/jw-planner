import { Component, OnInit } from '@angular/core';
import {GroupSaveDialogComponent} from '../group-save-dialog/group-save-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {GroupService} from '../groups.service';
import {AlertService} from 'ngx-alerts';
import {GroupSnapshot} from '../groups.model';
import {BehaviorSubject, Subject} from 'rxjs';
import {WarnDialogComponent} from '../../../shared/components/warn-dialog/warn-dialog.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'supervisor', 'actions'];
  groups: Subject<GroupSnapshot[]> = new BehaviorSubject<GroupSnapshot[]>([]);

  constructor(public dialog: MatDialog,
              private groupService: GroupService,
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
    WarnDialogComponent.open(this.dialog, 'Czy jesteś pewny, że chcesz usunąć tę grupę?').subscribe(result => {
      if (result) {
        this.groupService.deleteGroup(id).subscribe(() => {
          this.alert.success('Zapisano pomyślnie');
          this.fetchData();
        });
      }
    });
  }

  private fetchData() {
    this.groupService.getAllGroups().subscribe(result => {
      this.groups.next(result);
    });
  }

  private openSaveDialog(id?: number) {
    const dialogRef = this.dialog.open(GroupSaveDialogComponent, {minWidth: '480px', data: {groupId: id}});
    dialogRef.afterClosed().subscribe(groupId => {
      console.log('GroupSaveDialog closed', groupId);
      this.fetchData();
    });
  }
}
