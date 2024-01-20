import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-meeting-service',
  templateUrl: './meeting-service.component.html',
  styleUrls: ['./meeting-service.component.scss']
})
export class MeetingServiceComponent implements OnInit {

  currentMonth: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log('ngOnInit...');
    const year = this.route.snapshot.paramMap.get('year');
    const month = this.route.snapshot.paramMap.get('month');
    if (year && month) {
      this.currentMonth = year + '/' + month;
      this.processing();
    } else {
      this.router.navigate([moment().format('YYYY/MM')], {relativeTo: this.route});
    }
  }

  monthChosen(month: string): void {
    console.log('monthChosen', month);
    this.currentMonth = month;
    this.router.navigate(['/dashboard/meeting-staff/' + month]);
    this.processing();
  }

  private processing() {
    // TODO
    console.log('processing...', this.currentMonth);
  }
}
