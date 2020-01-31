import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './modules/home/home.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

// other imports
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
