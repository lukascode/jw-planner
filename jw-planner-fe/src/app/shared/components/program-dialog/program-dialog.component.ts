import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-program-dialog',
  templateUrl: './program-dialog.component.html',
  styleUrls: ['./program-dialog.component.scss']
})
export class ProgramDialogComponent implements OnInit {

  week: string;

  ngOnInit(): void {
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: {week: string},
              private sanitizer: DomSanitizer) {
    this.week = data.week;
  }

  iframeSrc(): SafeUrl {
    const url = environment.jwUrl + '/' + this.week;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
