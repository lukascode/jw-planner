import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Week} from '../meeting-service/staff.model';
import {environment} from '../../../environments/environment';
import {LectureDto, MeetingProgramSaveRequest, MeetingProgramSnapshot} from './program.model';


@Injectable({
  providedIn: 'root'
})
export class MeetingProgramService {
  constructor(private http: HttpClient) {}

  getWeeks(month: string): Observable<Week[]> {
    return this.http.get<Week[]>(`${environment.apiUrl}/staff/${month}/weeks`);
  }

  getProgram(month: string): Observable<MeetingProgramSnapshot> {
    return this.http.get<MeetingProgramSnapshot>(`${environment.apiUrl}/program/${month}`);
  }

  getLectures(): Observable<LectureDto[]> {
    return this.http.get<LectureDto[]>(`${environment.apiUrl}/lectures`);
  }

  saveProgram(rq: MeetingProgramSaveRequest, programId: number): Observable<number> {
    return this.http.put<number>(`${environment.apiUrl}/program/${programId}`, rq);
  }
}
