import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IntakeService {
  constructor(private http: HttpClient) {}

  SERVER_URL = "https://lacy-ringer.glitch.me/intake";

  get(id: string) {
    return this.http.get<AnimalResponse>(`${this.SERVER_URL}/${id}`).pipe(
      map((response: AnimalResponse) => {
        return response.animal;
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
      .delete(`${this.SERVER_URL}/${animal.id}`)
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

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError("A data error occurred, please try again.");
  }
}

interface AnimalResponse {
  animal: Animal;
}

export interface Animal {
  id: number;
  name: string;
  age: number;
  location: string;
  type: string;
  imgUrl: string;
}
