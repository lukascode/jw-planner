import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {MeetingStaffSaveRequest, MeetingStaffSnapshot, Week} from './staff.model';


@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor(private http: HttpClient) {}

  getWeeks(month: string): Observable<Week[]> {
    return this.http.get<Week[]>(`${environment.apiUrl}/staff/${month}/weeks`);
  }

  getScheduleSnapshot(month: string): Observable<MeetingStaffSnapshot> {
    return this.http.get<MeetingStaffSnapshot>(`${environment.apiUrl}/staff/${month}`);
  }

  saveSchedule(rq: MeetingStaffSaveRequest, scheduleId?: number): Observable<number> {
    if (scheduleId) {
      return this.http.put<number>(`${environment.apiUrl}/staff/${scheduleId}`, rq);
    }
    return this.http.post<number>(`${environment.apiUrl}/staff`, rq);
  }
}
