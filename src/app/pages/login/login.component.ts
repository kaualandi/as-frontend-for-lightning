import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CookiesLoginComponent } from "src/app/components/modals/cookies-login/cookies-login.component";
import { PasswordRecoveryComponent } from "src/app/components/modals/password-recovery/password-recovery.component";
import { StorageService } from "src/app/services/storage/storage.service";
import { SystemSettingsService } from "src/app/services/system-settigns/system-settings.service";
import { AuthService } from "./../../services/auth/auth.service";

export const RECOVERY_PASSWORD = {
  maxWidth: "550px",
  width: "100%",
};
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public storage: StorageService,
    private authService: AuthService,
    public router: Router,
    private systemService: SystemSettingsService
  ) {}

  loading = false;
  view_pass = false;
  version = "";

  login_form = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    remember: [false],
  });

  ngOnInit(): void {
    this.awaitRemember();
    this.storage.setToken("", false);
    this.readLocalFile();
  }

  readLocalFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "assets/version.txt", true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        this.version = xhr.responseText;
      }
    };

    xhr.send();
  }

  loginSubmitHandler() {
    if (this.login_form.invalid) return;

    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/i;
    const numberCPF = this.login_form.value.email?.replace(/\D/g, "");
    if (
      numberCPF?.length !== 11 &&
      !emailRegex.test(this.login_form.value.email || "")
    ) {
      this.login_form.get("email")?.setErrors({ cpf: true });
      return;
    }

    this.loading = true;

    const email: string = this.login_form.value.email as string;
    const password: string = this.login_form.value.password as string;
    const remember: boolean = this.login_form.value.remember as boolean;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        this.storage.setToken(response.token, remember);
        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 1000);
        this.getInitialSetting();
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getInitialSetting() {
    this.systemService.getSettings().subscribe({
      next: (data) => {
        console.log(data);
        this.storage.setInitialSettings(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  awaitRemember() {
    this.login_form.get("remember")?.valueChanges.subscribe((value) => {
      if (!value) return;

      if (!this.storage.cookies) {
        this.openCookieDialog();
      }
    });
  }

  openCookieDialog() {
    const dialogRef = this.dialog.open(CookiesLoginComponent, {
      panelClass: "cookies-dialog",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.storage.cookies = true;
      } else {
        this.login_form.get("remember")?.setValue(false);
      }
    });
  }

  onClickRecovery() {
    const dialogRef = this.dialog.open(PasswordRecoveryComponent, {
      ...RECOVERY_PASSWORD,
      disableClose: true,
      data: {
        email: this.login_form.value.email ?? "",
      },
    });

    dialogRef.afterClosed().subscribe({
      // next: (value: boolean) => {},
    });
  }
}
