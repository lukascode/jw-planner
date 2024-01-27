import {RouterModule, Routes} from '@angular/router';
import {MeetingPlanComponent} from './meeting-plan/meeting-plan.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


const routes: Routes = [
  {path: '', component: MeetingPlanComponent},
  {path: ':year/:month', component: MeetingPlanComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MeetingPlanRoutingModule {}
