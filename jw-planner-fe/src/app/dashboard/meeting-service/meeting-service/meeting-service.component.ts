import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-service',
  templateUrl: './meeting-service.component.html',
  styleUrls: ['./meeting-service.component.scss']
})
export class MeetingServiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  monthChosen(event: string): void {
    console.log(event);
  }
}
