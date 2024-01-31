/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPatientDisplay } from "src/app/models/patients";
import { IPagedReq } from "src/app/models/utils";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class PatientsService {
  constructor(private http: HttpService) {}

  public selectedPatientAge: number | undefined;

  getPatientById(id: number) {
    let query = null;

    query = new HttpParams().set("id", id);

    return this.http.get<IPagedReq<IPatientDisplay>>(
      "core/get-patient-by-id/",
      query
    );
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  setPatientAge(birth: string) {
    // ? Obtém o ano, mês e dia da data de nascimento
    const birthDate = new Date(birth);
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth() + 1; // Os meses em JavaScript são indexados de 0 a 11
    const birthDay = birthDate.getDate();

    // ? Obtém a data atual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // ? Calcula a idade
    let age = currentYear - birthYear;

    // ? Verifica se o aniversário deste ano já ocorreu
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }

    return age;
  }
}
