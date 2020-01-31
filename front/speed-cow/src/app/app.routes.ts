import {Routes} from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import {AffiliateListComponent} from './modules/affiliate/affiliate-list/affiliate-list.component';
import {AffiliateFormComponent} from './modules/affiliate/affiliate-form/affiliate-form.component';

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
  }
];
