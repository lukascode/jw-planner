import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticatedGuardService } from '../security/authenticated-guard.service';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuardService]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class PublicRoutingModule {}

