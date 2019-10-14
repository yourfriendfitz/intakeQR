import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IntakeService {
  constructor(private http: HttpClient) {}
  CLIENT_URL = "https://fitz-angular.firebaseapp.com/";
  SERVER_URL = "https://lacy-ringer.glitch.me/intake";
  STATIC_URL = "https://lacy-ringer.glitch.me/";
  get(id: string) {
    return this.http.get<Animal>(`${this.SERVER_URL}/animal/${id}`).pipe(
      map((response: Animal) => {
        return {
          ...response,
          imgUrl: this.formatUrl(response, this.STATIC_URL)
        };
      }),
      catchError(this.handleError)
    );
  }

  getAll() {
    return this.http.get<Animal[]>(`${this.SERVER_URL}s`).pipe(
      map((response: Animal[]) => {
        return response.map((animal: Animal) => {
          return {
            ...animal,
            imgUrl: this.formatUrl(animal, this.STATIC_URL)
          };
        });
      }),
      catchError(this.handleError)
    );
  }

  add(animal: Animal) {
    return this.http
      .post(`${this.SERVER_URL}`, animal)
      .pipe(catchError(this.handleError));
  }

  delete(animal: Animal) {
    return this.http
      .delete(`${this.SERVER_URL}/${animal._id}`)
      .pipe(catchError(this.handleError));
  }

  uploadImg(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file);
      let formData: FormData = new FormData();
      formData.append("file", file);
      console.log(formData);
      return this.http
        .post(`${this.SERVER_URL}/upload`, formData)
        .pipe(catchError(this.handleError));
    }
  }

  private formatUrl(animal: Animal, url: string): string {
    return url + animal.imgUrl;
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError("A data error occurred, please try again.");
  }

  defaultAnimal = () => {
    return {
      _id: "0",
      name: "Spot (Default Animal)",
      age: "1",
      location: "Houston",
      type: "Dog",
      imgUrl:
        "https://www.statnews.com/wp-content/uploads/2019/08/AdobeStock_182445295-645x645.jpeg"
    };
  };
}

export interface Animal {
  _id: string;
  name: string;
  age: string;
  location: string;
  type: string;
  imgUrl: string;
}
