import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CowListComponent} from './components/cow-list/cow-list.component';
import {CowFormComponent} from './components/cow-form/cow-form.component';
import {CowService} from './service/cow.service';
import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CowListComponent, CowFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule
  ]
})
export class CowModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CowModule,
      providers: [
        CowService,
        {provide: MAT_DATE_LOCALE, useValue: 'pt-br'}
      ]
    };
  }
}
