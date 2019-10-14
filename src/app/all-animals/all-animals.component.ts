import { Component, OnInit } from "@angular/core";
import { IntakeService, Animal } from "../intake.service";

@Component({
  selector: "app-all-animals",
  templateUrl: "./all-animals.component.html",
  styleUrls: ["./all-animals.component.scss"]
})
export class AllAnimalsComponent implements OnInit {
  animals: Animal[];
  loaded: boolean;
  CLIENT_URL = this.intakeService.CLIENT_URL;
  elementType: "url" | "canvas" | "img" = "url";
  constructor(private intakeService: IntakeService) {}

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals() {
    this.intakeService.getAll().subscribe(animals => {
      if (animals.length === 0) {
        animals = [this.intakeService.defaultAnimal()];
      }
      this.animals = animals;
      this.loaded = true;
    });
  }
  printQR = () => {
    window.print();
  };
}
