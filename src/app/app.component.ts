import { Component, OnInit } from "@angular/core";
import { ThemeService } from "./services/theme/theme.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(private theme: ThemeService, public translate: TranslateService) {
    translate.setDefaultLang("pt-br");
  }

  ngOnInit() {
    this.theme.loadCurrentTheme();
  }
}
