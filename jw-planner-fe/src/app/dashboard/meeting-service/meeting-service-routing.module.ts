import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MeetingServiceComponent} from './meeting-service/meeting-service.component';

const routes: Routes = [
  {path: '', component: MeetingServiceComponent},
  {path: ':year/:month', component: MeetingServiceComponent},
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
export class MeetingServiceRoutingModule {}
