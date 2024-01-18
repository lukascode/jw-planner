import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'MM/YYYY',
        },
        display: {
          dateInput: 'MMMM YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        },
      }
    }
  ]
})
export class MonthPickerComponent implements OnInit {

  @Output() monthEvent = new EventEmitter<string>();

  date = new FormControl(moment());
  minDate = moment('2024-01-01');


  ngOnInit(): void {
    this.emitEvent();
  }

  nextMonth(): void {
    const currentDate = this.date.value;
    this.date.setValue(currentDate.add(1, 'months'));
    this.emitEvent();
  }

  previousMonth(): void {
    const currentDate = this.date.value;
    const newDate = currentDate.add(-1, 'months');
    if (newDate >= this.minDate) {
      this.date.setValue(newDate);
      this.emitEvent();
    }
  }

  chosenYearHandler(normalizedYear: Moment): void {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  datePickerClosed(): void {
    this.emitEvent();
  }

  private emitEvent(): void {
    this.monthEvent.emit(this.date.value.format('YYYY/MM'));
  }
}
