import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WarnDialogComponent } from './components/warn-dialog/warn-dialog.component';
import { MonthPickerComponent } from './components/month-picker/month-picker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WarnDialogComponent,
    MonthPickerComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FlexLayoutModule,
    TranslateModule,
    MaterialModule,
    MonthPickerComponent
  ]
})
export class SharedModule { }
