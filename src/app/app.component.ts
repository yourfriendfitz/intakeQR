import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "intakeQR";
  qrcodedata: string;
  elementType: "url" | "canvas" | "img" = "url";
  value: string;
  display = false;
  href: string;
  onFileChanged(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert("Only images are supported.");
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.qrcodedata = reader.result.toString();
      console.log(reader.result);
    };
  }
  generateQRCode() {
    this.value = this.qrcodedata;
    this.display = true;
  }
  downloadImage() {
    this.href = document.getElementsByTagName("img")[0].src;
  }
}
