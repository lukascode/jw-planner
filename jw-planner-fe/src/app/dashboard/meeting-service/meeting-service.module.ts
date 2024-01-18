import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingServiceComponent } from './meeting-service/meeting-service.component';
import {MeetingServiceRoutingModule} from './meeting-service-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    MeetingServiceComponent
  ],
  imports: [
    CommonModule,
    MeetingServiceRoutingModule,
    SharedModule
  ]
})
export class MeetingServiceModule { }
