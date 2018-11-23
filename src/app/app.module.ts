import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MachineComponent } from './components/machine.component';
import { BrandComponent } from './components/brand.component';
import { OSComponent } from './components/operatingsystem.component';
import { NavBarComponent } from './components/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    MachineComponent,
    BrandComponent,
    OSComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
