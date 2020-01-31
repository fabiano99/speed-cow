import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExitComponent } from './exit/exit.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ExitComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  entryComponents: [ExitComponent]
})
export class DialogsModule { }
