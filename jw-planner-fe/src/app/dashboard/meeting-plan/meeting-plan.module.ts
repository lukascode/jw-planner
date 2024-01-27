import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingPlanComponent } from './meeting-plan/meeting-plan.component';
import {MeetingPlanRoutingModule} from './meeting-plan-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    MeetingPlanComponent
  ],
  imports: [
    CommonModule,
    MeetingPlanRoutingModule,
    SharedModule
  ]
})
export class MeetingPlanModule { }
