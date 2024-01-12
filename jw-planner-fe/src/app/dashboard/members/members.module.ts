import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersComponent } from './members/members.component';
import { MembersRoutingModule } from './members-routing.module';
import { MemberSaveDialogComponent } from './member-save-dialog/member-save-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MembersComponent,
    MemberSaveDialogComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MembersModule { }
