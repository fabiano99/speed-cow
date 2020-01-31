import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffiliateListComponent } from './affiliate-list/affiliate-list.component';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSnackBarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {AffiliateService} from './service/affiliate.service';
import { AffiliateFormComponent } from './affiliate-form/affiliate-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ExitComponent} from '../dialogs/exit/exit.component';
import {DialogsModule} from '../dialogs/dialogs.module';



@NgModule({
  declarations: [AffiliateListComponent, AffiliateFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
    FlexModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    DialogsModule
  ],
  providers: [AffiliateService],
  entryComponents: [ExitComponent]
})
export class AffiliateModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AffiliateModule,
      providers: [AffiliateService]
    };
  }

}
