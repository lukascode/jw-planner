import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import {DateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(translate: TranslateService, dateAdapter: DateAdapter<any>) {
    translate.setDefaultLang('pl');
    translate.use('pl');
    moment.locale('pl');
    dateAdapter.setLocale(moment.locale());
  }

  ngOnInit(): void {
  }
}
