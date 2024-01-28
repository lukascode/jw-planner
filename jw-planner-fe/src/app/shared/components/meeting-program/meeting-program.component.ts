import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MeetingProgramService} from '../../../dashboard/meeting-plan/meeting-program.service';
import {MemberSnapshot} from '../../../dashboard/members/members.model';
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
import {MatDialog} from "@angular/material/dialog";
import {ProgramDialogComponent} from "../program-dialog/program-dialog.component";

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
    if (this.touched) {
      this.meetingProgram.saveProgram({
        month: this.month.replace('/', '-'),
        weeks: this.weeks
      } as MeetingProgramSaveRequest, this.programId as number).subscribe(id => {
        this.programId = id;
        this.originalWeeks = JSON.parse(JSON.stringify(this.weeks));
        this.editMode = false;
        this.touched = false;
        this.alert.success('Zapisano pomyślnie');
      });
    } else {
      this.editMode = false;
    }
  }

  edit(): void {
    this.editMode = true;
  }

  cancel(): void {
    this.weeks = JSON.parse(JSON.stringify(this.originalWeeks));
    this.editMode = false;
    this.touched = false;
  }

    print(): void {
    window.print();
  }

  private fetchProgram(): void {
    this.programId = null;
    this.processing = true;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.month.isFirstChange()) {
      this.fetchProgram();
    }
  }

  valueChanged(event: MatSelectChange, obj: any, attribute: string): void {
    (obj as any)[attribute] = event.value;
    this.touched = true;
  }

  getMembers(...roles: string[]): MemberSnapshot[] {
    if (roles && roles.length > 0) {
      return this.members.filter(m => m.responsibilities.map(r => r.split(':')[0]).some(r => roles.includes(r)));
    }
    return this.members;
  }

  showProgram(week: MeetingProgramWeekDto): void {
    const w = moment(week.dateFrom).year() + '/' + moment(week.dateFrom).week();
    console.log(w);
    this.dialog.open(ProgramDialogComponent, {minWidth: '480px', data: {week: w}});
  }
}
