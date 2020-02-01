import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CowListComponent} from './components/cow-list/cow-list.component';
import {CowFormComponent} from './components/cow-form/cow-form.component';
import {CowService} from './service/cow.service';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatMenuModule} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';

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
    RouterModule
  ]
})
export class CowModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CowModule,
      providers: [CowService]
    };
  }
}
