import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResizeComponent } from './resize/resize.component';

import { ResizeService } from './_services/resizer.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResizeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [ResizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
