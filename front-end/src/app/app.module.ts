import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {routes} from './app.route';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {AuthService} from './auth/auth.service';
import { VerifiedComponent } from './verified/verified.component';
import { VerifiedService } from './verified/verified.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    VerifiedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [AuthService,VerifiedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
