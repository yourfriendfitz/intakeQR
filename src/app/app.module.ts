import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgxQRCodeModule } from 'ngx-qrcode2'; 

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpModule, NgxQRCodeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
