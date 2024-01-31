import { Injectable } from "@angular/core";
import { ICurvePointer } from "src/app/models/curves";
import { HttpService } from "../http/http.service";
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: "root"
})
export class CurvesService {
  constructor(private http: HttpService) {}

  curvesSocket = webSocket<ICurvePointer[]>(
    "ws://ec2-18-228-165-96.sa-east-1.compute.amazonaws.com:8001/"
  );

  getCurves() {
    return this.http.get<ICurvePointer[]>("http://localhost:3000/curves");
  }

  webSocketConnection() {
    return this.curvesSocket;
  }
}
