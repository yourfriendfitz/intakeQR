import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NgxQRCodeModule } from 'ngx-qrcode2'; 
import { routing } from './app.routing';
import { AppComponent } from "./app.component";
import { NavComponent } from './nav/nav.component';
import { AnimalComponent } from './animal/animal.component';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [AppComponent, NavComponent, AnimalComponent, AddComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule, NgxQRCodeModule, routing],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
