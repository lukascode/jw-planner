import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {StaffService} from '../staff.service';
import {MeetingStaffSaveRequest, WeekDto} from '../staff.model';
import {catchError, finalize, map} from 'rxjs/operators';
import {MemberService} from '../../members/members.service';
import {GroupService} from '../../groups/groups.service';
import {MemberSnapshot} from '../../members/members.model';
import {GroupSnapshot} from '../../groups/groups.model';
import {MatSelectChange} from '@angular/material/select';
import {AlertService} from 'ngx-alerts';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {Utils} from '../../../shared/utils/utils';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-meeting-service',
  templateUrl: './meeting-service.component.html',
  styleUrls: ['./meeting-service.component.scss']
})
export class MeetingServiceComponent implements OnInit {

  currentMonth: string;

  displayedColumns: string[] = [
    'week',
    'avMixer',
    'avMicrophone',
    'avStageMicrophone',
    'keeper',
    'zoomKeeper',
    'hallKeeper',
    'parking1',
    'parking2',
    'cleaning'
  ];
  scheduleId: number | null;
  weeks: WeekDto[] = [];
  originalWeeks: WeekDto[] = [];

  members: MemberSnapshot[] = [];
  groups: GroupSnapshot[] = [];

  editMode = false;
  touched = false;

  processing = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private staff: StaffService,
              private memberService: MemberService,
              private groupService: GroupService,
              private alert: AlertService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit...');
    const year = this.route.snapshot.paramMap.get('year');
    const month = this.route.snapshot.paramMap.get('month');
    if (year && month) {
      this.currentMonth = year + '/' + month;
      this.memberService.getAllMembers().subscribe(members => this.members = members);
      this.groupService.getAllGroups().subscribe(groups => this.groups = groups);
      this.fetchSchedule();
    } else {
      this.router.navigate([moment().format('YYYY/MM')], {relativeTo: this.route});
    }
  }

  monthChosen(month: string): void {
    console.log('monthChosen', month);
    this.currentMonth = month;
    this.router.navigate(['/dashboard/meeting-staff/' + month]);
    this.fetchSchedule();
  }

  private fetchSchedule(): void {
    console.log('fetchSchedule...', this.currentMonth);
    this.processing = true;
    this.editMode = false;
    this.scheduleId = null;
    const scheduleFromBackup = localStorage.getItem('schedule/' + this.currentMonth);
    const shId = localStorage.getItem('schedule/' + this.currentMonth + '/id');
    if (scheduleFromBackup) {
      this.weeks = JSON.parse(scheduleFromBackup);
      this.originalWeeks = JSON.parse(JSON.stringify(this.weeks));
      this.editMode = true;
      if (shId) {
        this.scheduleId = +shId;
      }
      this.processing = false;
    } else {
      this.staff.getScheduleSnapshot(this.currentMonth.replace('/', '-')).pipe(map(s => {
        this.scheduleId = s.id;
        for (const week of s.weeks) {
          const dateFrom = moment(week.dateFrom).format('DD MMMM');
          const dateTo = moment(week.dateTo).format('DD MMMM');
          week.week = dateFrom + ' - ' + dateTo;
        }
        return s.weeks;
      }), catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return this.staff
            .getWeeks(this.currentMonth.replace('/', '-'))
            .pipe(
              map(weeks => {
                for (const week of weeks) {
                  const dateFrom = moment(week.dateFrom).format('DD MMMM');
                  const dateTo = moment(week.dateTo).format('DD MMMM');
                  week.week = dateFrom + ' - ' + dateTo;
                }
                this.editMode = true;
                return weeks;
              })
            );
        }
        this.alert.danger(err.message);
        return of([]);
      }), finalize(() => this.processing = false)).subscribe(weeks => {
        this.originalWeeks = JSON.parse(JSON.stringify(weeks));
        this.weeks = weeks as WeekDto[];
      });
    }
  }

  edit(): void {
    this.editMode = true;
  }

  save(): void {
      this.staff.saveSchedule({
        month: this.currentMonth.replace('/', '-'),
        weeks: this.weeks
      } as MeetingStaffSaveRequest, this.scheduleId as number).subscribe(id => {
        this.scheduleId = id;
        this.originalWeeks = JSON.parse(JSON.stringify(this.weeks));
        this.editMode = false;
        this.touched = false;
        localStorage.removeItem('schedule/' + this.currentMonth);
        localStorage.removeItem('schedule/' + this.currentMonth + '/id');
        this.alert.success('Zapisano pomyślnie');
      });
  }

  cancel(): void {
    this.weeks = JSON.parse(JSON.stringify(this.originalWeeks));
    this.editMode = false;
    this.touched = false;
    localStorage.removeItem('schedule/' + this.currentMonth);
    localStorage.removeItem('schedule/' + this.currentMonth + '/id');
    this.fetchSchedule();
  }

  get cancelVisible(): boolean {
    return this.editMode;
  }

  print(): void {
    window.print();
  }

  memberChanged(event: MatSelectChange, week: WeekDto, attribute: string): void {
    (week as any)[attribute] = event.value;
    this.touched = true;
    this.backup();
  }

  getMembers(role: string): MemberSnapshot[] {
    return Utils.getMembers(this.members, [role]);
  }

  private backup(): void {
    localStorage.setItem('schedule/' + this.currentMonth, JSON.stringify(this.weeks));
    if (this.scheduleId) {
      localStorage.setItem('schedule/' + this.currentMonth + '/id', this.scheduleId.toString());
    }
  }
}
