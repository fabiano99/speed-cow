import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreedListComponent } from './components/breed-list/breed-list.component';
import { BreedFormComponent } from './components/breed-form/breed-form.component';
import {BreedService} from './service/breed.service';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [BreedListComponent, BreedFormComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    FlexModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class BreedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BreedModule,
      providers: [BreedService]
    };
  }
}
