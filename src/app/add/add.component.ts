import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { IntakeService, Animal } from "../intake.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"]
})
export class AddComponent implements OnInit {
  CLIENT_URL = "http://10.100.34.89:4200";
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
  setImgUrl = path => {
    console.log(path);
    this.form.patchValue({
      imgUrl: path
    });
    console.log(this.form.value);
  };

  // to test img upload
  onUpload(event) {
    this.intakeService
      .uploadImg(event)
      .subscribe(path => this.setImgUrl(path), error => console.log(error));
  }

  generateQRCode() {
    this.display = true;
  }

  handleResponse = (res: Animal) => {
    console.log(res);
    this.value = `${this.CLIENT_URL}/${res._id}`;
  };

  onSubmit() {
    console.log(this.form.value);
    this.intakeService
      .add(this.form.value)
      .subscribe((res: Animal) => this.handleResponse(res));
  }
}
