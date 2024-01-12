import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";
import { catchError, map } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class NotAuthenticatedGuardService implements CanActivate, CanActivateChild {

    constructor(private auth: AuthService, private router: Router) { }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.auth.getUserDetails().pipe(
            map(user => {
                localStorage.setItem('userDetails', JSON.stringify(user))
                return true;
            }),
            catchError(err => {
                localStorage.clear();
                this.router.navigate(['/public/login']);
                return of(false);
            })
        );
    }
}