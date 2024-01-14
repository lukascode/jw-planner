import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lectures: Observable<any[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.lectures = this.http.get<any[]>(`${environment.apiUrl}/lectures`);
  }
}
