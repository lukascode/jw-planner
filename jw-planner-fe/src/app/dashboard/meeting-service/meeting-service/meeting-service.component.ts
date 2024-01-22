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
    'parking',
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
    this.scheduleId = null;
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

  edit(): void {
    this.editMode = true;
  }

  save(): void {
    const emptySize = document.body.getElementsByClassName('mat-select-empty').length;
    if (this.touched && emptySize === 0) {
      this.staff.saveSchedule({
        month: this.currentMonth.replace('/', '-'),
        weeks: this.weeks
      } as MeetingStaffSaveRequest, this.scheduleId as number).subscribe(id => {
        this.scheduleId = id;
        this.originalWeeks = JSON.parse(JSON.stringify(this.weeks));
        this.editMode = false;
        this.touched = false;
        this.alert.success('Zapisano pomyślnie');
      });
    } else if (emptySize > 0) {
      this.alert.warning('Wypełnij wszystkie pola');
    } else {
      this.editMode = false;
    }
  }

  cancel(): void {
    this.weeks = JSON.parse(JSON.stringify(this.originalWeeks));
    this.editMode = false;
    this.touched = false;
  }

  get cancelVisible(): boolean {
    return this.editMode && document.body.getElementsByClassName('mat-select-empty').length === 0;
  }

  print(): void {
    window.print();
  }

  memberChanged(event: MatSelectChange, week: WeekDto, attribute: string): void {
    (week as any)[attribute] = event.value;
    this.touched = true;
  }

  getMembers(role: string): MemberSnapshot[] {
    return this.members.filter(m => m.responsibilities.map(r => r.split(':')[0]).includes(role));
  }
}
