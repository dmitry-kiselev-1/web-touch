import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from './material-design.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BreedService } from './services/breed.service';
import { DogService } from './services/dog.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    AppRoutingModule
  ],
  providers: [BreedService, DogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
