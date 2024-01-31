import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { TranslateModule } from "@ngx-translate/core";

import { CookiesLoginComponent } from "src/app/components/modals/cookies-login/cookies-login.component";
import { SharedModule } from "src/app/components/shared/shared.module";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule,
    LoginRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [LoginComponent, CookiesLoginComponent],
})
export class LoginModule {}
