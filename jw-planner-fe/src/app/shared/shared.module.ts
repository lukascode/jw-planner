import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WarnDialogComponent } from './components/warn-dialog/warn-dialog.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WarnDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    MaterialModule
  ],
  exports: [
    FlexLayoutModule,
    TranslateModule,
    MaterialModule
  ]
})
export class SharedModule { }
