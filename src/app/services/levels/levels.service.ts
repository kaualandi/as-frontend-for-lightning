import { Injectable } from "@angular/core";
import { Ilevel } from "src/app/models/user";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class LevelsService {
  constructor(private http: HttpService) {}

  getLevels() {
    // return this.http.get<Ilevel[]>("core/list-levels");
    return [
      { id: 1, level: "OPERADOR" },
      { id: 2, level: "ADMINISTRADOR" },
      { id: 3, level: "CLÍNICO" },
    ];
  }
}
