import {Routes} from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import {AffiliateListComponent} from './modules/affiliate/affiliate-list/affiliate-list.component';
import {AffiliateFormComponent} from './modules/affiliate/affiliate-form/affiliate-form.component';
import {BreedListComponent} from './modules/breed/components/breed-list/breed-list.component';
import {BreedFormComponent} from './modules/breed/components/breed-form/breed-form.component';
import {CowListComponent} from './modules/cow/components/cow-list/cow-list.component';
import {CowFormComponent} from './modules/cow/components/cow-form/cow-form.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'affiliates',
    component: AffiliateListComponent
  },
  {
    path: 'affiliates/:id',
    component: AffiliateFormComponent
  },
  {
    path: 'breeds',
    component: BreedListComponent
  },
  {
    path: 'breeds/:id',
    component: BreedFormComponent
  },
  {
    path: 'cows',
    component: CowListComponent
  },
  {
    path: 'cows/:id',
    component: CowFormComponent
  }
];
