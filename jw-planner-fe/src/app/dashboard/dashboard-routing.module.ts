import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { NotAuthenticatedGuardService } from '../security/not-authenticated-guard.service';

const routes: Routes = [
  {path: '', component: MainNavComponent, canActivateChild: [NotAuthenticatedGuardService], children: [
    {path: '', redirectTo: 'meeting-program', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)},
    {path: 'members', loadChildren: () => import('./members/members.module').then(mod => mod.MembersModule)},
    {path: 'groups', loadChildren: () => import('./groups/groups.module').then(mod => mod.GroupsModule)},
    {path: 'lecturers', loadChildren: () => import('./lecturers/lecturers.module').then(mod => mod.LecturersModule)},
    {path: 'meeting-staff', loadChildren: () => import('./meeting-service/meeting-service.module').then(mod => mod.MeetingServiceModule)},
    {path: 'meeting-program', loadChildren: () => import('./meeting-plan/meeting-plan.module').then(mod => mod.MeetingPlanModule)}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {}
