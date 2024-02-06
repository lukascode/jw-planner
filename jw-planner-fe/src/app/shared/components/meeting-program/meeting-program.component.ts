import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MeetingProgramService} from '../../../dashboard/meeting-plan/meeting-program.service';
import {Gender, MemberSnapshot} from '../../../dashboard/members/members.model';
import {AlertService} from 'ngx-alerts';
import {MemberService} from '../../../dashboard/members/members.service';
import {finalize, map} from 'rxjs/operators';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import {
  LectureDto,
  MeetingProgramSaveRequest,
  MeetingProgramWeekDto
} from '../../../dashboard/meeting-plan/program.model';
import {MatSelectChange} from '@angular/material/select';
import {MatDialog} from '@angular/material/dialog';
import {ProgramDialogComponent} from '../program-dialog/program-dialog.component';
import {Utils} from '../../utils/utils';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-meeting-program',
  templateUrl: './meeting-program.component.html',
  styleUrls: ['./meeting-program.component.scss']
})
export class MeetingProgramComponent implements OnInit, OnChanges {

  @Input() month: string;
  programId: number | null;
  programStatus: string;
  weeks: MeetingProgramWeekDto[] = [];
  originalWeeks: MeetingProgramWeekDto[] = [];
  members: MemberSnapshot[] = [];
  lectures: LectureDto[] = [];

  editMode = false;
  touched = false;
  processing = false;

  constructor(private meetingProgram: MeetingProgramService,
              private memberService: MemberService,
              private dialog: MatDialog,
              private alert: AlertService) {
  }

  ngOnInit(): void {
    this.memberService.getAllMembers().subscribe(members => this.members = members);
    this.meetingProgram.getLectures().subscribe(lectures => this.lectures = lectures);
    this.fetchProgram();
  }

  save(): void {
    this.meetingProgram.saveProgram({
      month: this.month.replace('/', '-'),
      weeks: this.weeks
    } as MeetingProgramSaveRequest, this.programId as number).subscribe(id => {
      this.programId = id;
      this.originalWeeks = JSON.parse(JSON.stringify(this.weeks));
      this.editMode = false;
      this.touched = false;
      localStorage.removeItem('program/' + this.month);
      localStorage.removeItem('program/' + this.month + '/id');
      this.alert.success('Zapisano pomyślnie');
    });
  }

  edit(): void {
    this.editMode = true;
  }

  cancel(): void {
    this.weeks = JSON.parse(JSON.stringify(this.originalWeeks));
    this.editMode = false;
    this.touched = false;
    localStorage.removeItem('program/' + this.month);
    localStorage.removeItem('program/' + this.month + '/id');
    this.fetchProgram();
  }

  print(): void {
    window.print();
  }

  private fetchProgram(): void {
    this.programId = null;
    this.editMode = false;
    this.processing = true;
    const programFromBackup = localStorage.getItem('program/' + this.month);
    const pId = localStorage.getItem('program/' + this.month + '/id');
    if (programFromBackup) {
      this.weeks = JSON.parse(programFromBackup);
      this.originalWeeks = JSON.parse(JSON.stringify(this.weeks));
      this.editMode = true;
      if (pId) {
        this.programId = +pId;
      }
      this.processing = false;
    } else {
      this.meetingProgram.getProgram(this.month.replace('/', '-')).pipe(map(p => {
        this.programId = p.id;
        this.programStatus = p.status;
        this.editMode = 'INITIAL' === this.programStatus ? true : false;
        for (const week of p.weeks) {
          const dateFrom = moment(week.dateFrom).format('DD MMMM');
          const dateTo = moment(week.dateTo).format('DD MMMM');
          week.week = dateFrom + ' - ' + dateTo;

          week.treasureTopics = [];
          week.improveTopics = [];
          week.livingAsChristianTopics = [];

          for (const topic of week.topics) {
            if ('TREASURES' === topic.section) {
              week.treasureTopics.push(topic);
            } else if ('IMPROVE' === topic.section) {
              week.improveTopics.push(topic);
            } else if ('LIVING_AS_CHRISTIANS' === topic.section) {
              week.livingAsChristianTopics.push(topic);
            }
          }
          week.rows = Math.max(week.treasureTopics.length, week.improveTopics.length, week.livingAsChristianTopics.length);
        }
        return p.weeks;
      }), finalize(() => this.processing = false)).subscribe(weeks => {
        this.originalWeeks = JSON.parse(JSON.stringify(weeks));
        this.weeks = weeks;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.month.isFirstChange()) {
      this.fetchProgram();
    }
  }

  valueChanged(event: MatSelectChange, obj: any, attribute: string): void {
    (obj as any)[attribute] = event.value;
    this.touched = true;
    this.backup();
  }

  getMembers(...roles: string[]): MemberSnapshot[] {
    return Utils.getMembers(this.members, roles);
  }

  showProgram(week: MeetingProgramWeekDto): void {
    const w = moment(week.dateFrom).year() + '/' + moment(week.dateFrom).week();
    this.dialog.open(ProgramDialogComponent, {panelClass: 'program-dialog', data: {week: w}});
  }

  private backup(): void {
    localStorage.setItem('program/' + this.month, JSON.stringify(this.weeks));
    if (this.programId) {
      localStorage.setItem('program/' + this.month + '/id', this.programId.toString());
    }
  }
}
