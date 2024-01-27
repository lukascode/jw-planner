import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-meeting-plan',
  templateUrl: './meeting-plan.component.html',
  styleUrls: ['./meeting-plan.component.scss']
})
export class MeetingPlanComponent implements OnInit {

  currentMonth: string;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInitplan');
    const year = this.route.snapshot.paramMap.get('year');
    const month = this.route.snapshot.paramMap.get('month');
    if (year && month) {
      this.currentMonth = year + '/' + month;
    } else {
      this.router.navigate([moment().format('YYYY/MM')], {relativeTo: this.route});
    }
  }

  monthChosen(month: string): void {
    console.log('monthChosen', month);
    this.currentMonth = month;
    this.router.navigate(['/dashboard/meeting-program/' + month]);
  }
}
