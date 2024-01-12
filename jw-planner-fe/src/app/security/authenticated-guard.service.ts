import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthenticatedGuardService implements CanActivate {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.auth.getUserDetails().pipe(
            map(user => {
                localStorage.setItem('userDetails', JSON.stringify(user));
                this.router.navigate(['/']);
                return false;
            }),
            catchError(err => {
                localStorage.clear();
                return of(true);
            }));
    }
}