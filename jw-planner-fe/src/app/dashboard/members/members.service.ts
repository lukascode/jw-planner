import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {MemberSaveRequest, MemberSnapshot} from './members.model';

@Injectable({
    providedIn: 'root'
})
export class MemberService {

    constructor(private http: HttpClient) {}

    getResponsibilities(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiUrl}/responsibilities`);
    }

    getMember(memberId: number): Observable<MemberSnapshot> {
        return this.http.get<MemberSnapshot>(`${environment.apiUrl}/members/${memberId}`);
    }

    getAllMembers(): Observable<MemberSnapshot[]> {
      return this.http.get<MemberSnapshot[]>(`${environment.apiUrl}/members`);
    }

    getMembers(responsibilities: string[]): Observable<MemberSnapshot[]> {
      return this.http.get<MemberSnapshot[]>(`${environment.apiUrl}/members?responsibilities=${responsibilities.join(',')}`);
    }

    saveMember(rq: MemberSaveRequest, memberId?: number): Observable<number> {
        if (memberId) {
            return this.http.put<number>(`${environment.apiUrl}/members/${memberId}`, rq);
        }
        return this.http.post<number>(`${environment.apiUrl}/members`, rq);
    }

    deleteMember(memberId: number): Observable<void> {
      return this.http.delete<void>(`${environment.apiUrl}/members/${memberId}`);
    }
}
