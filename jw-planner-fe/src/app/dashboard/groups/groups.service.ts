import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GroupSaveRequest, GroupSnapshot} from './groups.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {}

  saveGroup(rq: GroupSaveRequest, groupId?: number): Observable<number> {
    if (groupId) {
      return this.http.put<number>(`${environment.apiUrl}/groups/${groupId}`, rq);
    }
    return this.http.post<number>(`${environment.apiUrl}/groups`, rq);
  }

  getGroup(groupId: number): Observable<GroupSnapshot> {
    return this.http.get<GroupSnapshot>(`${environment.apiUrl}/groups/${groupId}`);
  }

  getAllGroups(): Observable<GroupSnapshot[]> {
    return this.http.get<GroupSnapshot[]>(`${environment.apiUrl}/groups`);
  }

  deleteGroup(groupId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/groups/${groupId}`);
  }
}

