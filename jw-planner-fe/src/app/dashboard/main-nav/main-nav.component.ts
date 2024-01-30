import {AfterViewChecked, ChangeDetectorRef, Component, Renderer2} from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
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
      this.appVersion = environment.appVersion;
      console.log('version', this.appVersion, userDetails.appVersion);
      this.setThemeMode(userDetails.darkMode);
  }

  ngAfterViewChecked(): void {
    if (this.mediaQuery.matches) {
      this.mobileNavHidden = true;
      this.cdr.detectChanges();
    }
  }

  toggleMobileNav(): void {
    this.mobileNavHidden = !this.mobileNavHidden;
  }

  toggleDarkMode(): void {
    this.auth.switchThemeMode().subscribe(dark => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails') as string);
      userDetails.darkMode = dark;
      this.setThemeMode(dark);
    });
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      console.log('Logged out successfully');
      this.router.navigate(['/public/login']);
    });
  }

  private setThemeMode(dark: boolean): void {
    const clazz = 'dark-mode';
    if (dark) {
      this.renderer.addClass(document.body, clazz);
    } else {
      this.renderer.removeClass(document.body, clazz);
    }
  }
}
