import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IntakeService, Animal } from "../intake.service";

@Component({
  selector: "app-animal",
  templateUrl: "./animal.component.html",
  styleUrls: ["./animal.component.scss"]
})
export class AnimalComponent implements OnInit {
  id: string;
  animal: Animal;
  loaded = false;
  SERVER_URL = "https://lacy-ringer.glitch.me";
  submitted = false;
  constructor(
    private intakeService: IntakeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const id: string = paramMap.get("id");
      this.getAnimal(id);
    });
  }

  getAnimal(id: string) {
    if (id === "0") {
      this.animal = this.intakeService.defaultAnimal();
      this.loaded = true;
      return;
    }
    this.id = id;
    this.intakeService.get(id).subscribe(animal => {
      console.log(animal);
      this.animal = animal;
      this.loaded = true;
    });
  }

  onSubmit = () => {
    const form = document.querySelector(".contact-form");
    form.classList.add("d-none");
    this.submitted = true;
  };
}
