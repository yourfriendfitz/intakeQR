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
  fullImgUrl: string;
  loaded = false;
  SERVER_URL = "https://lacy-ringer.glitch.me";
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
    this.id = id;
    this.intakeService.get(id).subscribe(animal => {
      console.log(animal);
      this.animal = animal;
      this.fullImgUrl = this.formatUrl(animal, this.SERVER_URL);
      this.loaded = true;
    });
  }

  private formatUrl(animal: Animal, url: string): string {
    return `${url}/${animal.imgUrl}`;
  }
}
