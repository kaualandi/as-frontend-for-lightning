import { ICreateDepartment, IDepartmentData } from "./../../models/department";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  constructor(private http: HttpService) {}
  getDepartments() {
    return this.http.get<IDepartmentData[]>("core/list-department/");
  }
}
