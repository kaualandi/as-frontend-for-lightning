import { Injectable } from "@angular/core";
import { IFunction } from "src/app/models/user";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class FunctionsService {
  constructor(private http: HttpService) {}

  getFunctions() {
    // return this.http.get<IFunction[]>("core/list-Functions");
    return [
      { id: 1, function: "Operador" },
      { id: 2, function: "Médico" },
      { id: 3, function: "T.I" },
      { id: 4, function: "Enfermeiro" },
    ];
  }
}
