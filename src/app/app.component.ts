import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "intakeQR";
  qrcodedata: string;
  elementType: "url" | "canvas" | "img" = "url";
  value: any;
  display = false;
  href: string;
  SERVER_URL = "https://lacy-ringer.glitch.me/intake";
  uploadForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      name: [""],
      age: [""],
      location: [""],
      type: [""],
      img: [""]
    });
    console.log(this.uploadForm.value);
  }

  onHandleChange = event => {
    this.uploadForm.get(event.target.name).setValue(event.target.value);
    console.log(this.uploadForm.value);
  };

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get("img").setValue(file);
    }
    console.log(this.uploadForm.value);
  }

  generateQRCode(res) {
    console.log(res);
    this.value = "https://www.google.com/";
    this.display = true;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("name", this.uploadForm.get("name").value);
    formData.append("age", this.uploadForm.get("age").value);
    formData.append("location", this.uploadForm.get("location").value);
    formData.append("type", this.uploadForm.get("type").value);
    // formData.append("file", this.uploadForm.get("img").value);
    this.httpClient
      .post<any>(this.SERVER_URL, formData)
      .subscribe(res => this.generateQRCode(res), err => console.log(err));
  }
}
