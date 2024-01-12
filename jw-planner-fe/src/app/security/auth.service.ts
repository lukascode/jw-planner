import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCredentials } from '../public/login/login.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {UserDetails} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(creds: UserCredentials): Observable<string> {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Basic ' + btoa(`${creds.email}:${creds.password}`));
        return this.http.get(`${environment.apiUrl}/auth`, {headers: headers, responseType: 'text'});
    }

    logout(): Observable<void> {
        return this.http.get<void>(`${environment.apiUrl}/auth/logout`);
    }

    getUserDetails(): Observable<UserDetails> {
        return this.http.get<UserDetails>(`${environment.apiUrl}/auth/me`);
    }

    switchThemeMode(): Observable<boolean> {
        return this.http.put<boolean>(`${environment.apiUrl}/auth/me/dark`, {});
    }
}