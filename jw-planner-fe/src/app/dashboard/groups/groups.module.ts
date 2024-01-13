import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups/groups.component';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupSaveDialogComponent } from './group-save-dialog/group-save-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    GroupsComponent,
    GroupSaveDialogComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GroupsModule { }
