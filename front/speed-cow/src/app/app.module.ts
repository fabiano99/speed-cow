import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BREAKPOINT, FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './modules/home/home.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

// other imports
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatSidenavModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {AffiliateModule} from './modules/affiliate/affiliate.module';
import {AffiliateService} from './modules/affiliate/service/affiliate.service';
import {HttpClientModule} from '@angular/common/http';
import {BreedModule} from './modules/breed/breed.module';
import {ChartsModule} from 'ng2-charts';
import {CowModule} from './modules/cow/cow.module';
import { FooterComponent } from './footer/footer.component';


const EXTRA_BREAKPOINTS = [{
  alias: 'xs.landscape',
  suffix: 'XsLandscape',
  mediaQuery: 'screen and (orientation: landscape) and (max-width: 559px)',
  priority: 1000,
  overlapping: false
}];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    // (optional) Additional Covalent Modules imports
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    LayoutModule,
    HttpClientModule,
    ChartsModule,
    FlexLayoutModule.withConfig({
      useColumnBasisZero: false,
      printWithBreakpoints: ['md', 'lt-lg', 'lt-xl', 'gt-sm', 'gt-xs']
    }),
    MatSidenavModule,
    AffiliateModule.forRoot(),
    BreedModule.forRoot(),
    CowModule.forRoot()
  ],
  providers: [{
    provide: BREAKPOINT,
    useValue: EXTRA_BREAKPOINTS,
    multi: true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
