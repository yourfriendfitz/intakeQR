import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { IntakeService } from "./intake.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "intakeQR";
  qrcodedata: string;
  elementType: "url" | "canvas" | "img" = "url";
  value: any;
  display = false;
  href: string;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private intakeService: IntakeService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(""),
      age: new FormControl(""),
      location: new FormControl(""),
      type: new FormControl(""),
      imgUrl: new FormControl("")
    });
    console.log(this.form.value);
  }

  // onHandleChange = event => {
  //   this.form.patchValue({
  //     [event.target.name]: event.target.value
  //   });
  //   console.log(this.form.value);
  // };

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        file: file
      });
    }
    console.log(this.form.value);
  }

  // to test img upload
  onUpload(event) {
    const setImgUrl = path => {
      console.log(path);
      this.form.patchValue({
        imgUrl: path
      });
      console.log(this.form.value)
    };
    this.intakeService
      .uploadImg(event)
      .subscribe(data => setImgUrl(data.path), error => console.log(error));
  }

  generateQRCode(res) {
    console.log(res);
    this.value = "https://www.google.com/";
    this.display = true;
  }

  onSubmit(animal) {
    console.log(animal);
    console.log(this.form.value);
    this.intakeService.add(this.form.value).subscribe(res => console.log(res));
  }
}
