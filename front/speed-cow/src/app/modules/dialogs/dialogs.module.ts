import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExitComponent } from './exit/exit.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import {FlexModule} from '@angular/flex-layout';



@NgModule({
  declarations: [ExitComponent, ErrorComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    FlexModule
  ],
  entryComponents: [ExitComponent, ErrorComponent]
})
export class DialogsModule { }
