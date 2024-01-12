import {AfterViewChecked, ChangeDetectorRef, Component, Renderer2, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations: [
    trigger('mobileNavInOut', [
      transition(':enter', [
        style({ 'max-height': 0 }),
        animate('500ms ease',
          style({ 'max-height': '100%'}))
      ]),
      transition(':leave', [
        style({ 'max-height': '100%' }),
        animate('500ms ease',
          style({ 'max-height': 0 }))
      ])
    ])
  ]
})
export class MainNavComponent implements AfterViewChecked {

  // (md && gt-md) media query
  mediaQuery = window.matchMedia('(min-width: 960px)');
  mobileNavHidden = true;

  email: string;
  appVersion: string;

  constructor(
    private cdr: ChangeDetectorRef, 
    private renderer: Renderer2, 
    private auth: AuthService,
    private router: Router) {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') as string);
      this.email = userDetails.email;
      this.appVersion = userDetails.appVersion;
      this.setThemeMode(userDetails.darkMode);
  }

  ngAfterViewChecked() {
    if (this.mediaQuery.matches) {
      this.mobileNavHidden = true;
      this.cdr.detectChanges();
    }
  }

  toggleMobileNav() {
    this.mobileNavHidden = !this.mobileNavHidden;
  }

  toggleDarkMode() {
    this.auth.switchThemeMode().subscribe(dark => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') as string);
      userDetails.darkMode = dark;
      this.setThemeMode(dark);
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      console.log("Logged out successfully");
      this.router.navigate(['/public/login'])
    });
  }

  private setThemeMode(dark: boolean) {
    const clazz = 'dark-mode';
    if (dark) {
      this.renderer.addClass(document.body, clazz);
    } else {
      this.renderer.removeClass(document.body, clazz);
    }
  }
}