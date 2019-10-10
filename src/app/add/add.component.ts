import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { IntakeService, Animal } from "../intake.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"]
})
export class AddComponent implements OnInit {
  CLIENT_URL = this.intakeService.CLIENT_URL;
  title = "intakeQR";
  qrcodedata: string;
  elementType: "url" | "canvas" | "img" = "url";
  value: string;
  animalName: string;
  display = false;
  uploading = false;
  uploaded = false;
  submitting = false;
  submitted = false;
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
    this.uploading = false;
    this.uploaded = true;
    console.log(this.form.value);
  };

  // to test img upload
  onUpload(event) {
    const qrDiv = document.querySelector(".qrPrint");
    qrDiv.classList.add("d-none");
    this.uploading = true;
    this.intakeService
      .uploadImg(event)
      .subscribe(path => this.setImgUrl(path), error => console.log(error));
  }

  generateQRCode() {
    const qrDiv = document.querySelector(".qrPrint");
    qrDiv.classList.remove("d-none");
    this.submitted = false;
    this.uploaded = false;
    this.display = true;
  }

  handleResponse = (res: Animal) => {
    console.log(res);
    this.value = `${this.CLIENT_URL}/${res._id}`;
    this.animalName = res.name;
    this.submitting = false;
    this.submitted = true;
  };

  printQR = () => {
    const qrInfo = document.querySelector(".qrInfo");
    qrInfo.classList.remove("d-none");
    window.print();
    qrInfo.classList.add("d-none");
  };

  onSubmit() {
    this.uploaded = false;
    this.submitting = true;
    this.intakeService
      .add(this.form.value)
      .subscribe((res: Animal) => this.handleResponse(res));
  }
}
