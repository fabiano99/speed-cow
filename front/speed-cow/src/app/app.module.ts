import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BREAKPOINT, FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './modules/home/home.component';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatPaginatorIntl, MatSidenavModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';
import {AffiliateModule} from './modules/affiliate/affiliate.module';
import {HttpClientModule} from '@angular/common/http';
import {BreedModule} from './modules/breed/breed.module';
import {ChartsModule} from 'ng2-charts';
import {CowModule} from './modules/cow/cow.module';
import {FooterComponent} from './modules/footer/footer.component';
import {MatPaginatorIntlCustom} from './utils/matPaginatorIntlCustom';


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
  providers: [
    {
        provide: BREAKPOINT,
        useValue: EXTRA_BREAKPOINTS,
        multi: true
    },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCustom}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
