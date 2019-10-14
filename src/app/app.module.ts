import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { routing } from "./app.routing";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { AnimalComponent } from "./animal/animal.component";
import { AddComponent } from "./add/add.component";
import { AllAnimalsComponent } from "./all-animals/all-animals.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AnimalComponent,
    AddComponent,
    AllAnimalsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxQRCodeModule,
    routing,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
